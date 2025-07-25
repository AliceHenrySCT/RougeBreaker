import { Skia } from "@shopify/react-native-skia";

// THIS SHADER COMES COURTESY OF P_Malin from ShaderToy
// SOURCE: https://www.shadertoy.com/view/MdlXWr
// TWITTER: https://twitter.com/P_Malin
// YOUTUBE: https://www.youtube.com/@paulmalin2116

export const shader = Skia.RuntimeEffect.Make(`
uniform vec2 iResolution;
uniform float iTime;

float fBrightness = 2.5;

// Number of angular segments
float fSteps = 121.0;

float fParticleSize = 0.015;
float fParticleLength = 0.5 / 60.0;

// Min and Max star position radius. Min must be present to prevent stars too near camera
float fMinDist = 0.8;
float fMaxDist = 5.0;

float fRepeatMin = 1.0;
float fRepeatMax = 2.0;

// fog density
float fDepthFade = 0.8;

float Random(float x)
{
	return fract(sin(x * 123.456) * 23.4567 + sin(x * 345.678) * 45.6789 + sin(x * 456.789) * 56.789);
}

vec3 GetParticleColour( const in vec3 vParticlePos, const in float fParticleSize, const in vec3 vRayDir )
{		
	vec2 vNormDir = normalize(vRayDir.xy);
	float d1 = dot(vParticlePos.xy, vNormDir.xy) / length(vRayDir.xy);
	vec3 vClosest2d = vRayDir * d1;
	
	vec3 vClampedPos = vParticlePos;
	
	vClampedPos.z = clamp(vClosest2d.z, vParticlePos.z - fParticleLength, vParticlePos.z + fParticleLength);
	
	float d = dot(vClampedPos, vRayDir);
	
	vec3 vClosestPos = vRayDir * d;
	
	vec3 vDeltaPos = vClampedPos - vClosestPos;	
		
	float fClosestDist = length(vDeltaPos) / fParticleSize;
	
	float fShade = 	clamp(1.0 - fClosestDist, 0.0, 1.0);
		
	fShade = fShade * exp2(-d * fDepthFade) * fBrightness;
	
	return vec3(fShade);
}

vec3 GetParticlePos( const in vec3 vRayDir, const in float fZPos, const in float fSeed )
{
	float fAngle = atan(vRayDir.x, vRayDir.y);
	float fAngleFraction = fract(fAngle / (3.14 * 2.0));
	
	float fSegment = floor(fAngleFraction * fSteps + fSeed) + 0.5 - fSeed;
	float fParticleAngle = fSegment / fSteps * (3.14 * 2.0);

	float fSegmentPos = fSegment / fSteps;
	float fRadius = fMinDist + Random(fSegmentPos + fSeed) * (fMaxDist - fMinDist);
	
	float tunnelZ = vRayDir.z / length(vRayDir.xy / fRadius);
	
	tunnelZ += fZPos;
	
	float fRepeat = fRepeatMin + Random(fSegmentPos + 0.1 + fSeed) * (fRepeatMax - fRepeatMin);
	
	float fParticleZ = (ceil(tunnelZ / fRepeat) - 0.5) * fRepeat - fZPos;
	
	return vec3( sin(fParticleAngle) * fRadius, cos(fParticleAngle) * fRadius, fParticleZ );
}

vec3 Starfield( const in vec3 vRayDir, const in float fZPos, const in float fSeed )
{	
	vec3 vParticlePos = GetParticlePos(vRayDir, fZPos, fSeed);
	
	return GetParticleColour(vParticlePos, fParticleSize, vRayDir);	
}

vec3 RotateX( const in vec3 vPos, const in float fAngle )
{
    float s = sin(fAngle);
    float c = cos(fAngle);
    
    vec3 vResult = vec3( vPos.x, c * vPos.y + s * vPos.z, -s * vPos.y + c * vPos.z);
    
    return vResult;
}

vec3 RotateY( const in vec3 vPos, const in float fAngle )
{
    float s = sin(fAngle);
    float c = cos(fAngle);
    
    vec3 vResult = vec3( c * vPos.x + s * vPos.z, vPos.y, -s * vPos.x + c * vPos.z);
    
    return vResult;
}

vec3 RotateZ( const in vec3 vPos, const in float fAngle )
{
    float s = sin(fAngle);
    float c = cos(fAngle);
    
    vec3 vResult = vec3( c * vPos.x + s * vPos.y, -s * vPos.x + c * vPos.y, vPos.z);
    
    return vResult;
}

vec4 main( in vec2 fragCoord )
{
	vec2 vScreenUV = fragCoord.xy / iResolution.xy;
	
	vec2 vScreenPos = vScreenUV * 2.0 - 1.0;
	vScreenPos.x *= iResolution.x / iResolution.y;

	vec3 vRayDir = normalize(vec3(vScreenPos, 1.0));

	vec3 vEuler = vec3(0.5 + sin(iTime * 0.2) * 0.125, 0.5 + sin(iTime * 0.1) * 0.125, iTime * 0.1 + sin(iTime * 0.3) * 0.5);
			

		
	vRayDir = RotateX(vRayDir, vEuler.x);
	vRayDir = RotateY(vRayDir, vEuler.y);
	vRayDir = RotateZ(vRayDir, vEuler.z);
	
	float fShade = 0.0;
		
	float a = 0.2;
	float b = 10.0;
	float c = 1.0;
	float fZPos = 5.0 + iTime * c + sin(iTime * a) * b;
	float fSpeed = c + a * b * cos(a * iTime);
	
	fParticleLength = 0.25 * fSpeed / 60.0;
	
	float fSeed = 0.0;
	
	vec3 vResult = mix(vec3(0.005, 0.0, 0.01), vec3(0.01, 0.005, 0.0), vRayDir.y * 0.5 + 0.5);
	
	for(int i=0; i<1; i++)
	{
		vResult += Starfield(vRayDir, fZPos, fSeed);
		fSeed += 1.234;
	}
	
	return vec4(sqrt(vResult),1.0);
}

void mainVR( out vec4 fragColor, in vec2 fragCoord, vec3 vRayOrigin, vec3 vRayDir )
{
/*	vec2 vScreenUV = fragCoord.xy / iResolution.xy;
	
	vec2 vScreenPos = vScreenUV * 2.0 - 1.0;
	vScreenPos.x *= iResolution.x / iResolution.y;

	vec3 vRayDir = normalize(vec3(vScreenPos, 1.0));

	vec3 vEuler = vec3(0.5 + sin(iTime * 0.2) * 0.125, 0.5 + sin(iTime * 0.1) * 0.125, iTime * 0.1 + sin(iTime * 0.3) * 0.5);
			

		
	vRayDir = RotateX(vRayDir, vEuler.x);
	vRayDir = RotateY(vRayDir, vEuler.y);
	vRayDir = RotateZ(vRayDir, vEuler.z);
*/	
	float fShade = 0.0;
		
	float a = 0.2;
	float b = 10.0;
	float c = 1.0;
	float fZPos = 5.0 + iTime * c + sin(iTime * a) * b;
	float fSpeed = c + a * b * cos(a * iTime);
	
	fParticleLength = 0.25 * fSpeed / 60.0;
	
	float fSeed = 0.0;
	
	vec3 vResult = mix(vec3(0.005, 0.0, 0.01), vec3(0.01, 0.005, 0.0), vRayDir.y * 0.5 + 0.5);
	
	for(int i=0; i<1; i++)
	{
		vResult += Starfield(vRayDir, fZPos, fSeed);
		fSeed += 1.234;
	}
	
	fragColor = vec4(sqrt(vResult),1.0);
}

`)!;