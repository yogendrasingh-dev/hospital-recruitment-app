import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, FadeInDown } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Feather from '@react-native-vector-icons/feather';
import { useDispatch } from 'react-redux';
import { setUserRole } from '../../store/slices/authSlice';
import { colors, fontSize, fontWeight, spacing, borderRadius } from '../../theme';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const RoleCard = ({ title, description, icon, color, onPress, delay }) => {
	const scale = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }]
		};
	});

	const handlePressIn = () => {
		scale.value = withSpring(0.95);
	};

	const handlePressOut = () => {
		scale.value = withSpring(1);
	};

	return (
		<AnimatedTouchable
			entering={FadeInDown.delay(delay).duration(600).springify()}
			onPress={onPress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			activeOpacity={0.9}
			style={[styles.card, animatedStyle]}
		>
			<LinearGradient
				colors={[color, colors.gradientEnd]}
				style={styles.cardGradient}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
				<View style={styles.iconCircle}>
					<Feather name={icon} size={48} color={colors.textWhite} />
				</View>
				<Text style={styles.cardTitle}>{title}</Text>
				<Text style={styles.cardDescription}>{description}</Text>
				<View style={styles.arrowContainer}>
					<Feather name="arrow-right" size={24} color={colors.textWhite} />
				</View>
			</LinearGradient>
		</AnimatedTouchable>
	);
};

const RoleSelectionScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	const handleRoleSelect = role => {
		dispatch(setUserRole(role));
		navigation.navigate('Login', { role });
	};

	return (
		<View style={styles.container}>
			<StatusBar barStyle="dark-content" backgroundColor={colors.background} />

			<Animated.View entering={FadeInDown.duration(500)} style={styles.header}>
				<Text style={styles.title}>Choose Your Role</Text>
				<Text style={styles.subtitle}>Select how you want to use Hyrect</Text>
			</Animated.View>

			<View style={styles.cardsContainer}>
				<RoleCard
					title="Healthcare Professional"
					description="Find your dream job in healthcare"
					icon="heart"
					color={colors.primary}
					onPress={() => handleRoleSelect('professional')}
					delay={200}
				/>
				<RoleCard
					title="Hospital / Recruiter"
					description="Post jobs and find top talent"
					icon="briefcase"
					color={colors.accent}
					onPress={() => handleRoleSelect('hospital')}
					delay={400}
				/>
			</View>

			<Animated.View entering={FadeInDown.delay(600).duration(500)} style={styles.footer}>
				<Text style={styles.footerText}>By continuing, you agree to our Terms of Service and Privacy Policy</Text>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		padding: spacing.xl
	},
	header: {
		marginTop: spacing.xxl,
		marginBottom: spacing.xl
	},
	title: {
		fontSize: fontSize.xxxl + 8,
		fontWeight: fontWeight.extrabold,
		color: colors.textPrimary,
		marginBottom: spacing.sm
	},
	subtitle: {
		fontSize: fontSize.lg,
		color: colors.textSecondary,
		fontWeight: fontWeight.medium
	},
	cardsContainer: {
		flex: 1,
		justifyContent: 'center',
		gap: spacing.lg
	},
	card: {
		borderRadius: borderRadius.xl,
		overflow: 'hidden',
		elevation: 8,
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.3,
		shadowRadius: 16
	},
	cardGradient: {
		padding: spacing.xl,
		minHeight: 200,
		justifyContent: 'center'
	},
	iconCircle: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: spacing.md
	},
	cardTitle: {
		fontSize: fontSize.xxl,
		fontWeight: fontWeight.bold,
		color: colors.textWhite,
		marginBottom: spacing.sm
	},
	cardDescription: {
		fontSize: fontSize.base,
		color: 'rgba(255, 255, 255, 0.9)',
		fontWeight: fontWeight.medium
	},
	arrowContainer: {
		position: 'absolute',
		right: spacing.xl,
		bottom: spacing.xl,
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		justifyContent: 'center',
		alignItems: 'center'
	},
	footer: {
		paddingVertical: spacing.lg
	},
	footerText: {
		fontSize: fontSize.sm,
		color: colors.textLight,
		textAlign: 'center',
		lineHeight: 20
	}
});

export default RoleSelectionScreen;
