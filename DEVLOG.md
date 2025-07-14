# RougeBreaker Development Log

A 3-week development journey creating a modern brick breaker game with React Native and Expo.

## Week 1: Foundation and Core Mechanics

**Objectives**: Establish project foundation and implement basic gameplay

**Major Accomplishments**:
- Set up Expo project with TypeScript and file-based routing
- Implemented physics engine based on [this YouTube tutorial](https://www.youtube.com/watch?v=Af2-OT9mE14&t=1203s) with realistic ball movement and collision detection
- Created responsive paddle controls using React Native Gesture Handler
- Generated 60-brick wall with gradient color system (purple to blue)
- Added starfield background using custom Skia shaders

**Challenges Overcome**:
- **Ball Sticking Issues**: Fixed by adding buffer zones in collision detection
- **TypeScript Configuration**: Resolved Skia type definitions and path mapping
- **Gesture Conflicts**: Separated touch handling from physics calculations

**Technologies Integrated**: React Native Skia, Reanimated, Gesture Handler, Expo Router

**Key Code Implementation**:
```typescript
// Physics-based collision detection with buffer zones
const resolveCollisionWithBounce = (info: Collision) => {
  const circleInfo = info.o1 as CircleInterface;
  const rectInfo = info.o2 as PaddleInterface | BrickInterface;
  
  // Add buffer to prevent ball sticking
  if (minDist === distToTop) {
    circleInfo.y.value = rectTop - RADIUS - 1; // Buffer zone
    circleInfo.vy = -Math.abs(circleInfo.vy);
  }
};

// Responsive paddle gesture handling
const gesture = Gesture.Pan()
  .onChange(({ x }) => {
    rectangleObject.x.value = x - adjustedPaddleWidth / 2;
  });
```

---

## Week 2: Game Features and Progression

**Objectives**: Add game depth with scoring, power-ups, and progression systems

**Major Accomplishments**:
- Implemented comprehensive scoring system (100 points per brick)
- Created three-power-up system: Speed Boost, Extra Life, Extra Ball
- Added round progression and win/lose conditions
- Built multi-ball gameplay (up to 6 balls simultaneously)
- Implemented lives system with extra life power-ups (max 3 lives)
- Added data persistence with AsyncStorage for high scores and recent games

**Challenges Overcome**:
- **State Synchronization**: Managed complex game state between UI and physics
- **Extra Balls Power-up**: Most challenging feature - could spawn extra balls but their movement wasn't being set properly. Required implementing delayed velocity copying and careful timing coordination
- **Multi-ball Physics**: Coordinated multiple ball objects with individual behaviors
- **Power-up Balance**: Designed strategic choices that enhance gameplay

**Features Added**: Leaderboard UI, power-up selection interface, score persistence

**Key Code Implementation**:
```typescript
// Extra ball spawning with delayed velocity copying
const spawnExtraBalls = () => {
  'worklet';
  if (extraBallPowerUps.value <= 0 || hasUsedExtraBalls.value) return;
  
  hasUsedExtraBalls.value = true;
  extraBallSpawnTime.value = Date.now();
  
  // Position near paddle for immediate collision
  extraBall.x.value = rectangleObject.x.value + (rectangleObject.width / 2);
  extraBall.y.value = paddleY - RADIUS + 2;
};

// Power-up selection system
const powerUps = [
  { id: 'speed', name: 'Speed Boost', icon: Zap },
  { id: 'shield', name: 'Extra Life', icon: Shield },
  { id: 'extraBall', name: 'Extra Ball', icon: Circle }
];
```

---

## Week 3: Polish and Difficulty System

**Objectives**: Create polished user experience with customizable difficulty

**Major Accomplishments**:
- Implemented three difficulty levels (Easy, Normal, Hard) with:
  - Ball speed variations (±15 from base)
  - Paddle size adjustments (±20% width)
  - Score multipliers (0.8x, 1.0x, 1.2x)
- Created immersive gameplay experience (hidden navigation during play)
- Added comprehensive settings panel with difficulty selection
- Implemented test mode toggle for faster development testing (10 vs 60 bricks)
- Optimized performance and fixed remaining collision bugs
- Enhanced UI/UX with smooth transitions and visual feedback

**Challenges Overcome**:
- **Platform Differences**: Handled Android navigation bar behavior inconsistencies
- **Performance Optimization**: Improved collision detection algorithms for smooth 60fps
- **Dynamic Properties**: Updated paddle size and ball speed without breaking physics

**Final Polish**: Comprehensive documentation, code cleanup

**Key Code Implementation**:
```typescript
// Dynamic difficulty adjustments
const getDifficultyAdjustedSpeed = (baseSpeed: number) => {
  switch (difficulty) {
    case 'easy': return baseSpeed - 15;
    case 'hard': return baseSpeed + 15;
    default: return baseSpeed;
  }
};

const getDifficultyAdjustedPaddleWidth = () => {
  switch (difficulty) {
    case 'easy': return PADDLE_WIDTH * 1.2; // 20% wider
    case 'hard': return PADDLE_WIDTH * 0.8; // 20% narrower
    default: return PADDLE_WIDTH;
  }
};

// Immersive gameplay with hidden navigation
useEffect(() => {
  onTabVisibilityChange(false); // Hide tabs during gameplay
  NavigationBar.setVisibilityAsync('hidden');
  StatusBar.setHidden(true, 'fade');
}, []);
```

---

## Known Issues

**Performance Stutters**: At the start of each gameplay round, there is a noticeable stutter effect that affects both the shader animation and ball movement. This may be related to the initialization timing between the Skia graphics engine and React Native Reanimated worklets, but the exact cause remains unidentified despite extensive debugging efforts.

**Potential Causes Investigated**:
- Shader compilation timing during component mount
- Worklet initialization delays
- Memory allocation patterns during game state transitions
- Frame synchronization between different rendering systems

This issue does not affect gameplay functionality but creates a brief visual hiccup that impacts the initial user experience. Future iterations should focus on identifying the root cause, potentially through profiling tools or alternative rendering approaches.

---

## Project Summary

**Total Development Time**: 3 weeks
**Final Features**: Physics-based gameplay, 3 difficulty levels, power-up selection system, multi-ball mechanics, score persistence, immersive UI
**Technologies Utilized**: React Native, Expo, Skia graphics, Reanimated worklets, TypeScript
**Lines of Code**: ~2,000+ TypeScript

**Key Learnings**:
1. **Performance Matters**: Game development requires careful optimization for smooth gameplay
2. **State Management**: Complex games need well-structured state handling between UI and physics
3. **User Experience**: Small details like difficulty selection and gameplay decisions significantly improve engagement

**Final Result**: Complete, polished brick breaker game ready for app store deployment with engaging mechanics and high replay value.