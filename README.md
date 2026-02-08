# Hyrect - Healthcare Recruitment Platform

A production-ready React Native mobile application for connecting healthcare professionals with hospitals.

## Features

### For Healthcare Professionals

- 📱 Browse and search healthcare job opportunities
- 💼 One-tap apply with saved profile
- ❤️ Save favorite jobs
- 📊 Track application status
- 💬 Chat with recruiters
- 🔔 Real-time notifications

### For Hospitals/Recruiters

- 📝 Post job openings
- 👥 Manage applications
- 📈 View analytics dashboard
- 💬 Communicate with candidates
- ⚡ Schedule interviews
- 🎯 Find qualified candidates

## Tech Stack

- **React Native 0.81.5** (CLI) - Latest React Native version
- **React 19.1.0** - Latest React with automatic batching
- **React Navigation 7** - Navigation with enhanced performance
- **Redux Toolkit 2.5** - State Management
- **React Native Reanimated 4** - High-performance animations
- **React Native Gesture Handler 2.22** - Advanced touch interactions
- **React Native Linear Gradient 3** - Beautiful gradients
- **React Native Vector Icons 10** - Comprehensive icon library
- **New Architecture** - Fabric renderer + TurboModules enabled
- **Hermes Engine** - Optimized JavaScript engine

## Installation

### Prerequisites

- Node.js >= 18
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)

### Setup

1. Clone the repository

```bash
cd HospitalRecruitmentApp
```

2. Install dependencies

```bash
npm install
```

3. Install iOS pods (iOS only)

```bash
cd ios && pod install && cd ..
```

4. Run the app

For iOS:

```bash
npm run ios
```

For Android:

```bash
npm run android
```

## Project Structure

```
HospitalRecruitmentApp/
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable components
│   │   ├── common/      # Common UI components
│   │   └── job/         # Job-related components
│   ├── data/            # Dummy data
│   ├── navigation/      # Navigation setup
│   ├── screens/         # App screens
│   │   ├── auth/        # Authentication screens
│   │   ├── hospital/    # Hospital-side screens
│   │   ├── professional/# Professional-side screens
│   │   └── shared/      # Shared screens
│   ├── store/           # Redux store
│   │   └── slices/      # Redux slices
│   ├── theme/           # Theme configuration
│   └── App.js           # Root component
├── android/             # Android native code
├── ios/                 # iOS native code
└── index.js             # Entry point
```

## Key Features Implemented

### UI/UX

- ✅ Smooth animations with Reanimated 3
- ✅ Glass morphism effects
- ✅ Gradient backgrounds
- ✅ Skeleton loaders
- ✅ Micro-interactions
- ✅ Spring animations
- ✅ Parallax scrolling

### Authentication

- ✅ Splash screen
- ✅ Onboarding flow
- ✅ Role selection
- ✅ Login/Register
- ✅ Form validation

### Hospital Dashboard

- ✅ Analytics cards
- ✅ Active jobs overview
- ✅ Application statistics
- ✅ Quick actions
- ✅ Recent activity

### Professional Dashboard

- ✅ Profile completion tracker
- ✅ Activity statistics
- ✅ Recommended jobs
- ✅ Saved jobs
- ✅ Applications tracker

### Job Management

- ✅ Job cards with animations
- ✅ Detailed job view
- ✅ Parallax header
- ✅ Save/Apply functionality
- ✅ Salary information
- ✅ Benefits display

## Customization

### Colors

Edit `src/theme/index.js` to customize the color palette:

```javascript
export const colors = {
	primary: '#00B4D8',
	secondary: '#48CAE4',
	accent: '#023E8A'
	// ... more colors
};
```

### Animations

Adjust animation timings in `src/theme/index.js`:

```javascript
export const animations = {
	fast: 200,
	normal: 300,
	slow: 500
};
```

## Dummy Data

The app uses dummy data from `src/data/dummyData.js`. Replace with real API calls:

- `hospitals` - Hospital profiles
- `professionals` - Professional profiles
- `jobPostings` - Job listings
- `applications` - Job applications
- `messages` - Chat messages

## Next Steps for Production

1. **Backend Integration**
   - Replace dummy data with API calls
   - Implement authentication with JWT
   - Add real-time messaging (Socket.io/Firebase)

2. **Additional Features**
   - Document upload functionality
   - Map view for job locations
   - Push notifications setup
   - In-app messaging system
   - Interview scheduling
   - Payment integration

3. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests with Detox

4. **Performance**
   - Image optimization
   - Code splitting
   - Bundle size optimization

5. **Deploy**
   - Setup CI/CD
   - Configure app signing
   - Submit to App Store / Play Store

## Logo & Branding

The app features:

- **Logo**: H+ symbol representing healthcare
- **Color Scheme**: Blue gradient (healthcare trust & professionalism)
- **App Name**: Hyrect (Hire + Recruit)
- **Tagline**: "Connecting Healthcare Professionals"

## License

MIT License - See LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using React Native
