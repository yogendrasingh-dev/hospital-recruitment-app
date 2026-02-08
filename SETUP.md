# Hyrect - Complete Setup Guide

## 🚀 Quick Start

This guide will walk you through setting up the Hyrect mobile application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version`

2. **npm** or **yarn**
   - Comes with Node.js
   - Verify: `npm --version`

3. **React Native CLI**

   ```bash
   npm install -g react-native-cli
   ```

4. **Watchman** (macOS only)
   ```bash
   brew install watchman
   ```

### For iOS Development (macOS only)

1. **Xcode** (v14 or higher)
   - Download from Mac App Store
   - Install Xcode Command Line Tools:
     ```bash
     xcode-select --install
     ```

2. **CocoaPods**
   ```bash
   sudo gem install cocoapods
   ```

### For Android Development

1. **Android Studio**
   - Download from: https://developer.android.com/studio

2. **Android SDK** (via Android Studio)
   - SDK Platforms: Android 13.0 (API 33)
   - SDK Tools: Android SDK Build-Tools, Android Emulator, Android SDK Platform-Tools

3. **Environment Variables** (Add to ~/.bash_profile or ~/.zshrc):
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

## Installation Steps

### 1. Navigate to Project Directory

```bash
cd HospitalRecruitmentApp
```

### 2. Install Dependencies

```bash
npm install
```

This will install all the required packages including:

- React Native 0.76.5
- React Navigation
- Redux Toolkit
- React Native Reanimated
- And all other dependencies

### 3. iOS Setup (macOS only)

Install iOS dependencies:

```bash
cd ios
pod install
cd ..
```

### 4. Android Setup

No additional setup required. The Android dependencies are managed by Gradle.

## Running the Application

### iOS (macOS only)

```bash
npm run ios
```

Or specify a simulator:

```bash
npm run ios -- --simulator="iPhone 15 Pro"
```

### Android

Start the Android emulator first, then:

```bash
npm run android
```

Or to run on a specific device:

```bash
adb devices  # List connected devices
npm run android -- --deviceId=DEVICE_ID
```

## Development Workflow

### Start Metro Bundler

```bash
npm start
```

### Clear Cache (if needed)

```bash
npm start -- --reset-cache
```

### Run on Physical Device

#### iOS (Physical Device)

1. Open `ios/Hyrect.xcworkspace` in Xcode
2. Select your device from the device menu
3. Enable "Automatically manage signing" in project settings
4. Click Run button

#### Android (Physical Device)

1. Enable Developer Options and USB Debugging on your Android device
2. Connect via USB
3. Run: `npm run android`

## Project Structure

```
HospitalRecruitmentApp/
├── src/
│   ├── App.js                    # Root component
│   ├── assets/                   # Images, fonts
│   ├── components/
│   │   ├── common/               # Reusable UI components
│   │   │   ├── Button.js
│   │   │   ├── Input.js
│   │   │   └── SkeletonLoader.js
│   │   └── job/
│   │       └── JobCard.js
│   ├── data/
│   │   └── dummyData.js          # Sample data
│   ├── navigation/
│   │   └── AppNavigator.js       # Navigation configuration
│   ├── screens/
│   │   ├── auth/                 # Authentication screens
│   │   │   ├── SplashScreen.js
│   │   │   ├── OnboardingScreen.js
│   │   │   ├── RoleSelectionScreen.js
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   ├── hospital/             # Hospital-side screens
│   │   │   └── dashboard/
│   │   │       └── HospitalDashboardScreen.js
│   │   ├── professional/         # Professional-side screens
│   │   │   └── dashboard/
│   │   │       └── ProfessionalDashboardScreen.js
│   │   └── shared/               # Shared screens
│   │       └── JobDetailScreen.js
│   ├── store/                    # Redux store
│   │   ├── index.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       ├── jobSlice.js
│   │       └── applicationSlice.js
│   └── theme/
│       └── index.js              # Theme configuration
├── android/                      # Android native code
├── ios/                          # iOS native code
├── index.js                      # Entry point
├── package.json
├── babel.config.js
├── metro.config.js
└── app.json
```

## Key Features Implemented

### ✨ Animations & UI

- ✅ Smooth transitions with React Native Reanimated 3
- ✅ Spring animations on buttons and cards
- ✅ Parallax scrolling in job details
- ✅ Skeleton loaders for content loading
- ✅ Gradient backgrounds
- ✅ Micro-interactions with haptic feedback

### 🔐 Authentication Flow

- ✅ Animated splash screen
- ✅ Onboarding carousel
- ✅ Role selection (Hospital/Professional)
- ✅ Login with validation
- ✅ Registration with form validation

### 🏥 Hospital Features

- ✅ Dashboard with analytics
- ✅ Job posting management
- ✅ Application tracking
- ✅ Quick actions
- ✅ Activity feed

### 👨‍⚕️ Professional Features

- ✅ Personalized dashboard
- ✅ Profile completion tracker
- ✅ Job recommendations
- ✅ Save/Apply to jobs
- ✅ Application status tracking

### 📱 Shared Features

- ✅ Beautiful job cards
- ✅ Detailed job view with parallax
- ✅ Save/bookmark functionality
- ✅ Bottom tab navigation
- ✅ State management with Redux

## Testing the App

### Default Login Credentials

**Hospital/Recruiter:**

- Email: any email format (e.g., hospital@test.com)
- Password: any password (6+ characters)

**Healthcare Professional:**

- Email: any email format (e.g., doctor@test.com)
- Password: any password (6+ characters)

_Note: The app uses dummy authentication for demonstration_

### Navigation Flow

1. **Splash Screen** → Auto-navigates to Onboarding (2.5s)
2. **Onboarding** → Swipe through 3 screens → Get Started
3. **Role Selection** → Choose Hospital or Professional
4. **Login/Register** → Enter credentials
5. **Main App** → Dashboard with bottom tabs

## Customization

### Theme Colors

Edit `src/theme/index.js`:

```javascript
export const colors = {
	primary: '#00B4D8', // Change primary color
	secondary: '#48CAE4', // Change secondary color
	accent: '#023E8A' // Change accent color
	// ... more colors
};
```

### Dummy Data

Edit `src/data/dummyData.js` to modify:

- Hospital profiles
- Job listings
- Professional profiles
- Application data

### Add New Screens

1. Create screen file in appropriate folder
2. Import in `src/navigation/AppNavigator.js`
3. Add to navigator stack/tab

## Troubleshooting

### iOS Issues

**Pod install fails:**

```bash
cd ios
pod deintegrate
pod install
cd ..
```

**Build fails:**

```bash
cd ios
xcodebuild clean
cd ..
npm run ios
```

### Android Issues

**Gradle sync fails:**

```bash
cd android
./gradlew clean
cd ..
npm run android
```

**Multiple devices error:**

```bash
adb devices
npm run android -- --deviceId=DEVICE_ID
```

### Metro Bundler Issues

**Port already in use:**

```bash
lsof -ti:8081 | xargs kill -9
npm start
```

**Cache issues:**

```bash
npm start -- --reset-cache
```

**Complete reset:**

```bash
watchman watch-del-all
rm -rf node_modules
rm -rf ios/Pods
rm -rf ios/build
rm -rf android/build
npm install
cd ios && pod install && cd ..
```

## Performance Optimization

### For Reanimated

The app uses React Native Reanimated 3. Ensure babel plugin is configured:

`babel.config.js`:

```javascript
plugins: ['react-native-reanimated/plugin'];
```

### For Vector Icons

To reduce bundle size, you can link only needed icon sets in:

- iOS: `ios/Hyrect/Info.plist`
- Android: `android/app/build.gradle`

## Production Build

### iOS

1. Open `ios/Hyrect.xcworkspace` in Xcode
2. Select "Generic iOS Device"
3. Product → Archive
4. Follow App Store submission process

### Android

Generate release APK:

```bash
cd android
./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

Generate AAB (for Play Store):

```bash
cd android
./gradlew bundleRelease
```

## Next Steps

### Backend Integration

- Replace dummy data with real API calls
- Implement JWT authentication
- Add real-time features (Socket.io/Firebase)

### Additional Features

- Push notifications
- In-app messaging
- Document upload
- Map integration
- Payment processing

### Testing

- Jest for unit tests
- Detox for E2E tests

## Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Reanimated Docs](https://docs.swmansion.com/react-native-reanimated/)

## Support

For issues or questions:

1. Check existing GitHub issues
2. Create new issue with detailed description
3. Include error logs and environment details

---

Happy Coding! 🎉
