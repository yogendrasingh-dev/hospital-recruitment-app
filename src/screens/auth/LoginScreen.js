import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	StatusBar,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform
} from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Feather from '@react-native-vector-icons/feather';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import { colors, fontSize, fontWeight, spacing, borderRadius } from '../../theme';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { hospitals, professionals } from '../../data/dummyData';

const LoginScreen = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const role = route.params?.role || 'professional';

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const validate = () => {
		const newErrors = {};

		if (!email) {
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = 'Email is invalid';
		}

		if (!password) {
			newErrors.password = 'Password is required';
		} else if (password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleLogin = () => {
		if (!validate()) return;

		setLoading(true);

		// Simulate API call
		setTimeout(() => {
			const user = role === 'hospital' ? hospitals[0] : professionals[0];
			dispatch(loginSuccess({ user, role }));
			setLoading(false);
			navigation.replace('Main');
		}, 1500);
	};

	const handleSocialLogin = provider => {
		console.log(`Login with ${provider}`);
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
			<StatusBar barStyle="dark-content" backgroundColor={colors.background} />

			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
				<Animated.View entering={FadeInDown.duration(500)} style={styles.header}>
					<LinearGradient
						colors={[colors.gradientStart, colors.gradientEnd]}
						style={styles.logoContainer}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
					>
						<Text style={styles.logoText}>H+</Text>
					</LinearGradient>
					<Text style={styles.title}>Welcome Back!</Text>
					<Text style={styles.subtitle}>
						{role === 'hospital' ? 'Hospital / Recruiter Login' : 'Professional Login'}
					</Text>
				</Animated.View>

				<Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.form}>
					<Input
						label="Email"
						value={email}
						onChangeText={setEmail}
						placeholder="Enter your email"
						keyboardType="email-address"
						autoCapitalize="none"
						error={errors.email}
						leftIcon={<Feather name="mail" size={20} color={colors.textSecondary} />}
					/>

					<Input
						label="Password"
						value={password}
						onChangeText={setPassword}
						placeholder="Enter your password"
						secureTextEntry
						error={errors.password}
						leftIcon={<Feather name="lock" size={20} color={colors.textSecondary} />}
					/>

					<TouchableOpacity style={styles.forgotPassword}>
						<Text style={styles.forgotPasswordText}>Forgot Password?</Text>
					</TouchableOpacity>

					<Button title="Login" onPress={handleLogin} loading={loading} gradient fullWidth size="large" />

					<View style={styles.divider}>
						<View style={styles.dividerLine} />
						<Text style={styles.dividerText}>OR</Text>
						<View style={styles.dividerLine} />
					</View>

					<View style={styles.socialButtons}>
						<TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('google')}>
							<Feather name="mail" size={24} color={colors.error} />
						</TouchableOpacity>
						<TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('facebook')}>
							<Feather name="facebook" size={24} color="#4267B2" />
						</TouchableOpacity>
						<TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('apple')}>
							<Feather name="smartphone" size={24} color={colors.textPrimary} />
						</TouchableOpacity>
					</View>
				</Animated.View>

				<Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.footer}>
					<Text style={styles.footerText}>Don't have an account? </Text>
					<TouchableOpacity onPress={() => navigation.navigate('Register', { role })}>
						<Text style={styles.footerLink}>Sign Up</Text>
					</TouchableOpacity>
				</Animated.View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background
	},
	scrollContent: {
		flexGrow: 1,
		padding: spacing.xl
	},
	header: {
		alignItems: 'center',
		marginTop: spacing.xxl,
		marginBottom: spacing.xl
	},
	logoContainer: {
		width: 80,
		height: 80,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: spacing.md
	},
	logoText: {
		fontSize: 42,
		fontWeight: fontWeight.extrabold,
		color: colors.textWhite
	},
	title: {
		fontSize: fontSize.xxxl,
		fontWeight: fontWeight.bold,
		color: colors.textPrimary,
		marginBottom: spacing.xs
	},
	subtitle: {
		fontSize: fontSize.base,
		color: colors.textSecondary,
		fontWeight: fontWeight.medium
	},
	form: {
		flex: 1
	},
	forgotPassword: {
		alignSelf: 'flex-end',
		marginBottom: spacing.lg
	},
	forgotPasswordText: {
		fontSize: fontSize.sm,
		color: colors.primary,
		fontWeight: fontWeight.semibold
	},
	divider: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: spacing.xl
	},
	dividerLine: {
		flex: 1,
		height: 1,
		backgroundColor: colors.border
	},
	dividerText: {
		marginHorizontal: spacing.md,
		fontSize: fontSize.sm,
		color: colors.textSecondary,
		fontWeight: fontWeight.medium
	},
	socialButtons: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: spacing.md
	},
	socialButton: {
		width: 56,
		height: 56,
		borderRadius: borderRadius.md,
		backgroundColor: colors.surface,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: colors.border
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: spacing.lg
	},
	footerText: {
		fontSize: fontSize.base,
		color: colors.textSecondary
	},
	footerLink: {
		fontSize: fontSize.base,
		color: colors.primary,
		fontWeight: fontWeight.semibold
	}
});

export default LoginScreen;
