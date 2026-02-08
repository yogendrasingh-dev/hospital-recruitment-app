# 🚀 Hyrect - Developer Quick Reference

## 📦 Installation Commands

```bash
# Install dependencies
npm install

# iOS Setup
cd ios && pod install && cd ..

# Run iOS
npm run ios

# Run Android
npm run android

# Start Metro
npm start

# Clear cache
npm start -- --reset-cache
```

---

## 🎯 Test Credentials

**Login as Hospital:**

- Email: `hospital@test.com`
- Password: `123456`

**Login as Professional:**

- Email: `doctor@test.com`
- Password: `123456`

_Any valid email + 6+ char password works!_

---

## 📂 Key Files

```
src/
├── App.js                      # Root component
├── theme/index.js              # Colors, spacing, fonts
├── navigation/AppNavigator.js  # Navigation setup
├── store/index.js              # Redux store
├── data/dummyData.js           # Sample data
└── components/common/
    ├── Button.js               # Reusable button
    ├── Input.js                # Reusable input
    └── SkeletonLoader.js       # Loading skeleton
```

---

## 🎨 Quick Styling

### Import Theme

```javascript
import { colors, spacing, fontSize, borderRadius } from '../theme';
```

### Common Styles

```javascript
// Card
backgroundColor: colors.surface,
borderRadius: borderRadius.lg,
padding: spacing.lg,

// Primary Button
backgroundColor: colors.primary,
padding: spacing.md,

// Text
color: colors.textPrimary,
fontSize: fontSize.base,
```

---

## 🔄 Redux Usage

### Import

```javascript
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../store/slices/authSlice';
```

### Read State

```javascript
const { user, userRole } = useSelector(state => state.auth);
const { jobs } = useSelector(state => state.job);
```

### Dispatch Actions

```javascript
const dispatch = useDispatch();
dispatch(loginSuccess({ user, role: 'hospital' }));
dispatch(toggleSaveJob(jobId));
```

---

## 🎬 Animation Patterns

### Import

```javascript
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
```

### Entrance Animation

```javascript
<Animated.View entering={FadeInDown.delay(300).duration(500)}>{/* Content */}</Animated.View>
```

### Press Animation

```javascript
const scale = useSharedValue(1);

const animatedStyle = useAnimatedStyle(() => ({
	transform: [{ scale: scale.value }]
}));

const handlePress = () => {
	scale.value = withSpring(0.95);
	setTimeout(() => {
		scale.value = withSpring(1);
	}, 100);
};

<Animated.View style={animatedStyle}>
	<TouchableOpacity onPress={handlePress}>{/* Content */}</TouchableOpacity>
</Animated.View>;
```

---

## 🧭 Navigation

### Import

```javascript
import { useNavigation } from '@react-navigation/native';
```

### Navigate

```javascript
const navigation = useNavigation();

// Go to screen
navigation.navigate('JobDetail', { job });

// Go back
navigation.goBack();

// Replace screen
navigation.replace('Main');
```

---

## 🎨 Color Reference

```javascript
colors.primary; // #00B4D8 - Main brand
colors.secondary; // #48CAE4 - Secondary
colors.accent; // #023E8A - Accent
colors.success; // #06D6A0 - Green
colors.warning; // #FFB703 - Orange
colors.error; // #EF476F - Red
colors.background; // #F8F9FA - Page BG
colors.surface; // #FFFFFF - Card BG
colors.textPrimary; // #212529 - Main text
colors.textSecondary; // #6C757D - Secondary text
colors.border; // #DEE2E6 - Borders
```

---

## 📏 Spacing Scale

```javascript
spacing.xs; // 4px
spacing.sm; // 8px
spacing.md; // 16px
spacing.lg; // 24px
spacing.xl; // 32px
spacing.xxl; // 48px
```

---

## 🔤 Font Sizes

```javascript
fontSize.xs; // 10px
fontSize.sm; // 12px
fontSize.md; // 14px
fontSize.base; // 16px
fontSize.lg; // 18px
fontSize.xl; // 20px
fontSize.xxl; // 24px
fontSize.xxxl; // 32px
fontSize.huge; // 48px
```

---

## 🎯 Component Props

### Button

```javascript
<Button
	title="Click Me"
	onPress={handlePress}
	variant="primary" // primary|secondary|outline|ghost|danger
	size="medium" // small|medium|large
	gradient={true} // boolean
	loading={false} // boolean
	disabled={false} // boolean
	fullWidth={true} // boolean
	icon={<Icon />} // component
/>
```

### Input

```javascript
<Input
	label="Email"
	value={email}
	onChangeText={setEmail}
	placeholder="Enter email"
	keyboardType="email-address"
	autoCapitalize="none"
	error={errors.email}
	leftIcon={<Icon name="mail" />}
	secureTextEntry={false}
	multiline={false}
/>
```

### JobCard

```javascript
<JobCard
	job={jobObject}
	onPress={() => handlePress(job)}
	onSave={() => handleSave(job.id)}
	isSaved={savedJobs.includes(job.id)}
	variant="default" // default|hospital
/>
```

---

## 📊 Dummy Data Structure

### Job Object

```javascript
{
  id: 'j1',
  hospitalId: 'h1',
  hospitalName: 'City General',
  hospitalLogo: 'url',
  title: 'Senior Cardiologist',
  positionType: 'Doctor',
  specialty: 'Cardiology',
  description: '...',
  requirements: [],
  responsibilities: [],
  salaryMin: 150000,
  salaryMax: 250000,
  salaryPeriod: 'year',
  experienceRequired: 5,
  location: 'New York, NY',
  shiftType: 'Day',
  employmentType: 'Full-time',
  benefits: [],
  status: 'active',
  featured: true,
}
```

---

## 🔧 Common Tasks

### Add New Screen

1. Create file: `src/screens/YourScreen.js`
2. Add to navigator: `src/navigation/AppNavigator.js`

```javascript
<Stack.Screen name="YourScreen" component={YourScreen} />
```

### Add New Color

Edit `src/theme/index.js`:

```javascript
export const colors = {
	...existingColors,
	yourColor: '#HEX'
};
```

### Add Dummy Data

Edit `src/data/dummyData.js`:

```javascript
export const yourData = [
	// Your data objects
];
```

### Add Redux Slice

1. Create: `src/store/slices/yourSlice.js`
2. Import in store: `src/store/index.js`

```javascript
import yourReducer from './slices/yourSlice';

export const store = configureStore({
	reducer: {
		...existing,
		your: yourReducer
	}
});
```

---

## 🐛 Debug Helpers

### Redux DevTools

```javascript
// Already configured in store/index.js
// Use React Native Debugger or Flipper
```

### React Native Debugger

```bash
# Open debugger
Cmd + D (iOS) / Cmd + M (Android)
# Select "Debug"
```

### Console Logs

```javascript
console.log('Debug:', value);
console.warn('Warning:', issue);
console.error('Error:', error);
```

### Network Requests

```javascript
// View in React Native Debugger Network tab
// Or use Flipper
```

---

## 📱 Platform-Specific Code

```javascript
import { Platform } from 'react-native';

// Simple check
Platform.OS === 'ios' ? iosCode : androidCode;

// Select method
Platform.select({
	ios: iosValue,
	android: androidValue
});

// Version check
Platform.Version >= 11;
```

---

## 🎨 Icon Usage

```javascript
import Feather from '@react-native-vector-icons/feather';

<Icon
	name="heart" // icon name
	size={24} // size in px
	color={colors.primary} // color
/>;

// Common icons:
// home, user, heart, briefcase, message-circle
// search, bell, settings, menu, x, check
// arrow-left, arrow-right, plus, minus
// mail, phone, map-pin, calendar, clock
```

---

## 🔥 Performance Tips

```javascript
// 1. Use React.memo for expensive components
export default React.memo(Component);

// 2. Use useCallback for functions
const handlePress = useCallback(() => {}, []);

// 3. Use useMemo for expensive calculations
const value = useMemo(() => compute(), [deps]);

// 4. Use FlatList for long lists
<FlatList data={items} renderItem={renderItem} keyExtractor={item => item.id} />;

// 5. Optimize images
import FastImage from 'react-native-fast-image';
<FastImage source={{ uri }} />;
```

---

## 📝 Git Workflow

```bash
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Description"

# Push
git push origin main

# Pull latest
git pull origin main

# Create branch
git checkout -b feature/name

# Switch branch
git checkout main
```

---

## 🚀 Build Commands

### iOS

```bash
# Debug build
npx react-native run-ios

# Release build
npx react-native run-ios --configuration Release

# Specific simulator
npx react-native run-ios --simulator="iPhone 14 Pro"
```

### Android

```bash
# Debug build
npx react-native run-android

# Release build
cd android && ./gradlew assembleRelease

# Specific device
adb devices
npx react-native run-android --deviceId=DEVICE_ID
```

---

## 🔍 Useful VS Code Extensions

- ES7 React/Redux Snippets
- React Native Tools
- Prettier
- ESLint
- GitLens
- Auto Rename Tag
- Bracket Pair Colorizer
- Path Intellisense

---

## ⌨️ Keyboard Shortcuts

### iOS Simulator

- `Cmd + D` - Debug menu
- `Cmd + R` - Reload
- `Cmd + Shift + Z` - Shake gesture

### Android Emulator

- `Cmd + M` - Debug menu
- `R + R` - Reload
- `Cmd + Shift + A` - Open AVD Manager

---

## 📚 Quick Links

- [React Native Docs](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Reanimated Docs](https://docs.swmansion.com/react-native-reanimated/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

---

## 💡 Pro Tips

1. **Hot Reload**: Enable for instant updates (usually on by default)
2. **Fast Refresh**: Preserves component state during edits
3. **Flipper**: Use for debugging network, Redux, and more
4. **Component Inspector**: Cmd+D → Toggle Inspector
5. **Performance Monitor**: Cmd+D → Show Perf Monitor

---

Keep this file handy while developing! 🚀
