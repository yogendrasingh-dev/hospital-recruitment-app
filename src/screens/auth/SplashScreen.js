import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withSequence,
	withTiming,
	runOnJS
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme';

const SplashScreen = ({ navigation }) => {
	const logoScale = useSharedValue(0);
	const logoOpacity = useSharedValue(0);

	useEffect(() => {
		logoOpacity.value = withTiming(1, { duration: 500 });
		logoScale.value = withSequence(withSpring(1.2, { damping: 10 }), withSpring(1, { damping: 8 }));

		const timeout = setTimeout(() => {
			navigation.replace('Onboarding');
		}, 2500);

		return () => clearTimeout(timeout);
	}, []);

	const animatedLogoStyle = useAnimatedStyle(() => {
		return {
			opacity: logoOpacity.value,
			transform: [{ scale: logoScale.value }]
		};
	});

	return (
		<LinearGradient
			colors={[colors.gradientStart, colors.gradientEnd, colors.gradientAccent]}
			style={styles.container}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
		>
			<StatusBar barStyle="light-content" backgroundColor={colors.primary} />
			<Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
				<View style={styles.logo}>
					<Animated.Text style={styles.logoText}>H+</Animated.Text>
				</View>
				<Animated.Text style={styles.appName}>Hyrect</Animated.Text>
				<Animated.Text style={styles.tagline}>Connecting Healthcare Professionals</Animated.Text>
			</Animated.View>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	logoContainer: {
		alignItems: 'center'
	},
	logo: {
		width: 120,
		height: 120,
		borderRadius: 30,
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 24,
		borderWidth: 3,
		borderColor: 'rgba(255, 255, 255, 0.3)'
	},
	logoText: {
		fontSize: 56,
		fontWeight: '800',
		color: colors.textWhite
	},
	appName: {
		fontSize: 48,
		fontWeight: '800',
		color: colors.textWhite,
		marginBottom: 8,
		letterSpacing: 2
	},
	tagline: {
		fontSize: 16,
		color: 'rgba(255, 255, 255, 0.9)',
		fontWeight: '500'
	}
});

export default SplashScreen;
