import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
	FadeInDown,
	FadeIn,
	FadeInUp,
	SlideInUp,
	ZoomIn
} from 'react-native-reanimated';
import Feather from '@react-native-vector-icons/feather';
import { useDispatch } from 'react-redux';
import { setUserRole } from '../../store/slices/authSlice';
import { colors, fontSize, fontWeight, spacing, borderRadius } from '../../theme';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const RoleCard = ({ title, description, icon, color, isSelected, onPress, delay }) => {
	const scale = useSharedValue(1);
	const iconScale = useSharedValue(1);

	const cardAnimStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
		shadowColor: isSelected ? color : 'transparent',
		shadowOpacity: isSelected ? 0.25 : 0,
		shadowRadius: isSelected ? 16 : 0,
		shadowOffset: { width: 0, height: isSelected ? 8 : 0 },
		elevation: isSelected ? 16 : 2
	}));

	const iconAnimStyle = useAnimatedStyle(() => ({
		transform: [{ scale: iconScale.value }]
	}));

	const handlePressIn = () => {
		scale.value = withSpring(0.97, { damping: 15 });
		iconScale.value = withSpring(1.12, { damping: 12 });
	};

	const handlePressOut = () => {
		scale.value = withSpring(1, { damping: 15 });
		iconScale.value = withSpring(1, { damping: 12 });
	};

	return (
		<AnimatedTouchable
			entering={ZoomIn.delay(delay).duration(600).springify()}
			onPress={onPress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			activeOpacity={0.92}
			style={[styles.card, cardAnimStyle, isSelected && { borderColor: color, borderWidth: 3 }]}
		>
			<View style={[styles.cardGradient, { backgroundColor: isSelected ? color : '#FFFFFF' }]}>
				<Animated.View style={[styles.iconWrapper, iconAnimStyle]}>
					<View
						style={[
							styles.iconCircle,
							{
								backgroundColor: isSelected ? 'rgba(255,255,255,0.18)' : color + '15',
								borderColor: isSelected ? '#fff' : color + '30',
								borderWidth: isSelected ? 2 : 1
							}
						]}
					>
						<Feather name={icon} size={32} color={isSelected ? '#fff' : color} />
					</View>
				</Animated.View>
				<View style={{ alignItems: 'center', marginTop: spacing.md }}>
					<Text
						style={[
							styles.cardTitle,
							{ color: isSelected ? '#fff' : colors.textPrimary, fontWeight: '700', fontSize: fontSize.lg }
						]}
					>
						{title}
					</Text>
					<Text
						style={[
							styles.cardDescription,
							{
								color: isSelected ? 'rgba(255,255,255,0.92)' : colors.textSecondary,
								fontWeight: '500',
								fontSize: fontSize.base
							}
						]}
					>
						{description}
					</Text>
				</View>
				{isSelected && (
					<Animated.View entering={ZoomIn.duration(300)} style={styles.checkmark}>
						<Feather name="check-circle" size={22} color={'#fff'} />
					</Animated.View>
				)}
			</View>
		</AnimatedTouchable>
	);
};

const RoleSelectionScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const [selectedRole, setSelectedRole] = useState(null);

	const handleRoleSelect = role => {
		setSelectedRole(role);
	};

	const handleContinue = () => {
		if (selectedRole) {
			dispatch(setUserRole(selectedRole));
			navigation.navigate('Login', { role: selectedRole });
		}
	};

	return (
		<View style={styles.container}>
			<StatusBar barStyle="dark-content" backgroundColor={colors.background} />

			{/* Decorative Elements */}
			<Animated.View entering={ZoomIn.duration(1200)} style={styles.decorCircle1} />
			<Animated.View entering={ZoomIn.delay(200).duration(1200)} style={styles.decorCircle2} />

			<Animated.View entering={FadeIn.duration(600)} style={styles.header}>
				<Animated.Text entering={FadeInDown.delay(200).springify()} style={styles.greeting}>
					Welcome!
				</Animated.Text>
				<Animated.View entering={FadeInDown.delay(300).springify()}>
					<Text style={styles.title}>Join Hyrect</Text>
					<Text style={styles.titleSubtext}>Choose Your Path</Text>
				</Animated.View>
				<Animated.Text entering={FadeIn.delay(500)} style={styles.subtitle}>
					Select your role to get started
				</Animated.Text>
			</Animated.View>

			<View style={styles.cardsContainer}>
				<RoleCard
					title="Healthcare"
					description="Professional"
					icon="heart"
					color={colors.primary}
					isSelected={selectedRole === 'professional'}
					onPress={() => handleRoleSelect('professional')}
					delay={600}
				/>
				<View style={{ height: 32 }} />
				<RoleCard
					title="Hospital"
					description="Recruiter"
					icon="users"
					color={colors.accent}
					isSelected={selectedRole === 'hospital'}
					onPress={() => handleRoleSelect('hospital')}
					delay={750}
				/>
			</View>

			<View style={styles.bottomSection}>
				{selectedRole && (
					<Animated.View entering={FadeInUp.duration(400)} style={styles.buttonContainer}>
						<TouchableOpacity
							style={[
								styles.nextButton,
								{
									backgroundColor: colors.primary,
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'center',
									paddingVertical: spacing.md + 2,
									paddingHorizontal: spacing.xl,
									gap: spacing.sm
								}
							]}
							onPress={handleContinue}
							activeOpacity={0.8}
						>
							<Text style={styles.nextButtonText}>Continue</Text>
							<Feather name="arrow-right" size={20} color={colors.textWhite} />
						</TouchableOpacity>
					</Animated.View>
				)}

				<Animated.View entering={FadeInUp.delay(selectedRole ? 0 : 900).duration(500)} style={styles.footer}>
					<Text style={styles.footerText}>
						By continuing, you agree to our <Text style={styles.footerLink}>Terms of Service</Text> and{' '}
						<Text style={styles.footerLink}>Privacy Policy</Text>
					</Text>
				</Animated.View>
			</View>
		</View>
	);
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background
	},
	decorCircle1: {
		position: 'absolute',
		width: 250,
		height: 250,
		borderRadius: 125,
		backgroundColor: colors.primary,
		opacity: 0.04,
		top: -80,
		right: -60
	},
	decorCircle2: {
		position: 'absolute',
		width: 200,
		height: 200,
		borderRadius: 100,
		backgroundColor: colors.accent,
		opacity: 0.04,
		bottom: -50,
		left: -50
	},
	header: {
		paddingHorizontal: spacing.xl,
		paddingTop: spacing.xxl + spacing.md,
		marginBottom: spacing.lg
	},
	greeting: {
		fontSize: fontSize.lg,
		fontWeight: fontWeight.extrabold,
		color: colors.primary,
		letterSpacing: -0.8,
		marginBottom: spacing.xxs
	},
	title: {
		fontSize: fontSize.xxxl,
		fontWeight: fontWeight.extrabold,
		color: colors.primary,
		letterSpacing: -0.8
	},
	titleSubtext: {
		fontSize: fontSize.lg,
		fontWeight: fontWeight.semibold,
		color: colors.textPrimary,
		letterSpacing: -0.3
	},
	subtitle: {
		fontSize: fontSize.base,
		color: colors.textSecondary,
		textAlign: 'center',
		marginTop: spacing.md
	},
	cardsContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: spacing.lg,
		marginVertical: spacing.xl,
		gap: 0
	},
	card: {
		width: 150,
		height: 150
	},
	cardCircle: {
		flex: 1,
		borderRadius: 1000,
		overflow: 'hidden',
		borderWidth: 3,
		borderColor: 'transparent'
	},
	cardCircleSelected: {
		borderColor: colors.success,
		elevation: 20,
		shadowColor: colors.success,
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.3,
		shadowRadius: 16
	},
	cardGradient: {
		flex: 1,
		padding: spacing.sm,
		justifyContent: 'center',
		alignItems: 'center'
	},
	iconWrapper: {
		marginBottom: spacing.xs
	},
	iconCircle: {
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center'
	},
	cardTitle: {
		fontSize: fontSize.base,
		fontWeight: fontWeight.bold,
		textAlign: 'center',
		letterSpacing: -0.3,
		lineHeight: 20
	},
	cardDescription: {
		fontSize: fontSize.xs,
		fontWeight: fontWeight.medium,
		textAlign: 'center',
		lineHeight: 16
	},
	checkmark: {
		position: 'absolute',
		top: spacing.sm,
		right: spacing.sm,
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		borderRadius: 20,
		padding: 4
	},
	bottomSection: {
		paddingHorizontal: spacing.xl,
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: 'center',
		paddingBottom: spacing.xl
	},
	buttonContainer: {
		width: '100%',
		marginBottom: spacing.md
	},
	nextButton: {
		borderRadius: borderRadius.lg,
		overflow: 'hidden',
		elevation: 6,
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.25,
		shadowRadius: 12,
		width: '100%'
	},
	nextButtonGradient: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: spacing.lg,
		paddingHorizontal: spacing.xl,
		gap: spacing.sm,
		width: '100%'
	},
	nextButtonText: {
		fontSize: fontSize.lg,
		fontWeight: '700',
		color: colors.textWhite,
		letterSpacing: 0.3,
		flex: 1,
		textAlign: 'center'
	},
	footer: {
		paddingVertical: spacing.lg,
		paddingBottom: spacing.xl
	},
	footerText: {
		fontSize: fontSize.xs,
		color: colors.textLight,
		textAlign: 'center',
		lineHeight: 18
	},
	footerLink: {
		color: colors.primary,
		fontWeight: fontWeight.semibold
	}
});

export default RoleSelectionScreen;
