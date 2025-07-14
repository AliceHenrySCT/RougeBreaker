# RougeBreaker - Score Based Brick Breaker Game

A modern take on the classic brick breaker game built with React Native and Expo. Break through colorful brick walls, advance through challenging rounds, and compete for the highest score in this immersive mobile gaming experience.

## Project Overview

RougeBreaker is a physics-based brick breaker game that combines classic arcade gameplay with modern mobile features. Players control a paddle to bounce a ball and destroy all bricks on the screen to advance through increasingly difficult rounds. The game features multiple difficulty levels, power-ups, extra lives, and a comprehensive scoring system.

## Features

### Core Gameplay
- **Physics-based ball movement** with realistic collision detection
- **60 colorful bricks** arranged in a solid wall formation with gradient colors
- **Responsive paddle control** with touch/drag gestures
- **Multiple rounds** with increasing difficulty
- **Lives system** with extra life power-ups

### Power-Up System
- **Speed Boost**: Increases ball movement speed
- **Extra Life**: Provides additional chances when the ball is missed
- **Extra Ball**: Spawns additional balls for multi-ball gameplay (up to 6 balls simultaneously)

### Difficulty Levels
- **Easy**: Slower ball speed, larger paddle, reduced score multiplier
- **Normal**: Balanced gameplay experience
- **Hard**: Faster ball speed, smaller paddle, increased score multiplier

### User Interface
- **Immersive gameplay** with hidden navigation during play
- **Real-time score tracking** with difficulty-based multipliers
- **Lives counter** and round progression display
- **Leaderboard system** with high scores and recent games
- **Settings panel** for difficulty customization
- **Test mode** for faster development testing (10 bricks vs full 60)

### Visual Features
- **Animated starfield background** using custom shaders
- **Gradient brick colors** from purple to blue
- **Smooth animations** and transitions
- **Responsive design** for various screen sizes

## Installation Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Expo CLI (`npm install -g @expo/cli`)
- For mobile testing: Expo Go app on your device

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/AliceHenrySCT/RougeBreaker
   cd rougebreaker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   npx expo start
   ```

4. **Run on device/simulator**
   - **Mobile**: Scan the QR code with Expo Go app
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal
   - **Web**: Press `w` in the terminal

## Usage

### Getting Started
1. Launch the app and tap "Start Game" from the main menu
2. Drag your finger across the screen to move the paddle
3. Keep the ball in play by bouncing it off the paddle
4. Break all 60 bricks to complete the round

### Power-Up Selection
- After completing a round, choose from three power-ups:
  - **Speed Boost**: Makes the ball move faster
  - **Extra Life**: Gives you an additional life (max 3)
  - **Extra Ball**: Spawns additional balls when you hit the paddle

### Game Controls
- **Paddle Movement**: Drag anywhere on the screen
- **Menu Navigation**: Use the bottom tab bar

### Scoring System
- **100 points** per brick (base score)
- **Difficulty multipliers**: Easy (0.8x), Normal (1.0x), Hard (1.2x)
- **Bonus points** for completing rounds quickly

### Development Features
- **Test Mode**: Toggle between 10 bricks (testing) and 60 bricks (normal gameplay)
- **Difficulty Settings**: Easy, Normal, and Hard modes with different gameplay parameters
- **Score Persistence**: High scores and recent games saved locally

## Technologies Used

### Core Framework
- **React Native** (0.79.5) - Cross-platform mobile development
- **Expo** (53.0.17) - Development platform and tooling
- **TypeScript** (5.8.3) - Type-safe JavaScript

### Navigation & UI
- **Expo Router** (5.1.3) - File-based navigation system
- **React Navigation** (7.1.14) - Navigation library
- **Lucide React Native** (0.525.0) - Icon library

### Graphics & Animation
- **React Native Skia** (2.0.0) - 2D graphics and custom shaders
- **React Native Reanimated** (3.17.4) - High-performance animations
- **React Native Gesture Handler** (2.24.0) - Touch gesture handling

### Fonts & Styling
- **Expo Google Fonts** (0.4.1) - Inter font family
- **StyleSheet API** - React Native styling

### Storage & State
- **AsyncStorage** (2.2.0) - Local data persistence
- **React Hooks** - State management

### Platform Features
- **Expo Navigation Bar** (4.2.7) - Android navigation bar control
- **Expo Status Bar** (2.2.3) - Status bar customization

## Future Improvements

### Gameplay Enhancements
- **More Power-ups**: Magnetic paddle, explosive balls, phasing balls
- **Special Bricks**: Unbreakable bricks, moving bricks, bonus bricks
- **Boss Levels**: Special challenge rounds with unique mechanics
- **Combo System**: Score multipliers for consecutive brick hits

### Visual & Audio
- **Sound Effects**: Ball bounces, brick breaks, power-up collection
- **Background Music**: Dynamic soundtrack that changes with intensity
- **Particle Effects**: Brick destruction animations, power-up trails
- **Themes**: Multiple visual themes and color schemes

### Social Features
- **Online Leaderboards**: Global high score competition
- **Achievements**: Unlock system for special accomplishments
- **Daily Challenges**: Special game modes with unique rewards
- **Multiplayer**: Local or online competitive modes

### Technical Improvements
- **Performance Optimization**: Better frame rates on lower-end devices
- **Accessibility**: Screen reader support, colorblind-friendly options
- **Cloud Save**: Sync progress across devices
- **Analytics**: Track player behavior and optimize gameplay

### Platform Expansion
- **iOS App Store** deployment
- **Google Play Store** deployment
- **Web Version** with touch and keyboard controls
- **Desktop Version** with mouse controls

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Shader effects courtesy of P_Malin from ShaderToy
- Base physics engine created by @DanRNLab on youtube
- Inspired by classic arcade brick breaker games
- Built with the Expo and React Native communities