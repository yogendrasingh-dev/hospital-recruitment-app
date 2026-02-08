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
import Animated, { FadeInDown } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Feather from '@react-native-vector-icons/feather';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import { colors, fontSize, fontWeight, spacing, borderRadius } from '../../theme';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { hospitals, professionals } from '../../data/dummyData';

const RegisterScreen = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const role = route.params?.role || 'professional';

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		password: '',
		confirmPassword: ''
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [acceptTerms, setAcceptTerms] = useState(false);

	const updateField = (field, value) => {
		setFormData(prev => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors(prev => ({ ...prev, [field]: null }));
		}
	};

	const validate = () => {
		const newErrors = {};

		if (!formData.name) {
			newErrors.name = 'Name is required';
		}

		if (!formData.email) {
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Email is invalid';
		}

		if (!formData.phone) {
			newErrors.phone = 'Phone number is required';
		} else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
			newErrors.phone = 'Phone number is invalid';
		}

		if (!formData.password) {
			newErrors.password = 'Password is required';
		} else if (formData.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
		}

		if (!formData.confirmPassword) {
			newErrors.confirmPassword = 'Please confirm password';
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
		}

		if (!acceptTerms) {
			newErrors.terms = 'Please accept terms and conditions';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleRegister = () => {
		if (!validate()) return;

		setLoading(true);

		// Simulate API call
		setTimeout(() => {
			const user = {
				...formData,
				id: Date.now().toString(),
				verified: false
			};
			dispatch(loginSuccess({ user, role }));
			setLoading(false);
			navigation.replace('Main');
		}, 1500);
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
			<StatusBar barStyle="dark-content" backgroundColor={colors.background} />

			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
				<Animated.View entering={FadeInDown.duration(500)} style={styles.header}>
					<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
						<Feather name="arrow-left" size={24} color={colors.textPrimary} />
					</TouchableOpacity>
					<Text style={styles.title}>Create Account</Text>
					<Text style={styles.subtitle}>
						{role === 'hospital' ? 'Register your hospital to post jobs' : 'Join as a healthcare professional'}
					</Text>
				</Animated.View>

				<Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.form}>
					<Input
						label={role === 'hospital' ? 'Hospital Name' : 'Full Name'}
						value={formData.name}
						onChangeText={value => updateField('name', value)}
						placeholder="Enter your name"
						error={errors.name}
						leftIcon={<Feather name="user" size={20} color={colors.textSecondary} />}
					/>

					<Input
						label="Email"
						value={formData.email}
						onChangeText={value => updateField('email', value)}
						placeholder="Enter your email"
						keyboardType="email-address"
						autoCapitalize="none"
						error={errors.email}
						leftIcon={<Feather name="mail" size={20} color={colors.textSecondary} />}
					/>

					<Input
						label="Phone Number"
						value={formData.phone}
						onChangeText={value => updateField('phone', value)}
						placeholder="Enter your phone number"
						keyboardType="phone-pad"
						error={errors.phone}
						leftIcon={<Icon name="phone" size={20} color={colors.textSecondary} />}
					/>

					<Input
						label="Password"
						value={formData.password}
						onChangeText={value => updateField('password', value)}
						placeholder="Create a password"
						secureTextEntry
						error={errors.password}
						leftIcon={<Feather name="lock" size={20} color={colors.textSecondary} />}
					/>

					<Input
						label="Confirm Password"
						value={formData.confirmPassword}
						onChangeText={value => updateField('confirmPassword', value)}
						placeholder="Confirm your password"
						secureTextEntry
						error={errors.confirmPassword}
						leftIcon={<Feather name="lock" size={20} color={colors.textSecondary} />}
					/>

					<TouchableOpacity style={styles.checkboxContainer} onPress={() => setAcceptTerms(!acceptTerms)}>
						<View style={[styles.checkbox, acceptTerms && styles.checkboxChecked]}>
							{acceptTerms && <Feather name="check" size={16} color={colors.textWhite} />}
						</View>
						<Text style={styles.checkboxText}>
							I agree to the <Text style={styles.link}>Terms & Conditions</Text> and{' '}
							<Text style={styles.link}>Privacy Policy</Text>
						</Text>
					</TouchableOpacity>
					{errors.terms && <Text style={styles.errorText}>{errors.terms}</Text>}

					<Button
						title="Create Account"
						onPress={handleRegister}
						loading={loading}
						gradient
						fullWidth
						size="large"
						style={styles.registerButton}
					/>
				</Animated.View>

				<Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.footer}>
					<Text style={styles.footerText}>Already have an account? </Text>
					<TouchableOpacity onPress={() => navigation.navigate('Login', { role })}>
						<Text style={styles.footerLink}>Login</Text>
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
		marginTop: spacing.lg,
		marginBottom: spacing.xl
	},
	backButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: colors.surface,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: spacing.md
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
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginBottom: spacing.sm
	},
	checkbox: {
		width: 24,
		height: 24,
		borderRadius: 6,
		borderWidth: 2,
		borderColor: colors.border,
		marginRight: spacing.sm,
		justifyContent: 'center',
		alignItems: 'center'
	},
	checkboxChecked: {
		backgroundColor: colors.primary,
		borderColor: colors.primary
	},
	checkboxText: {
		flex: 1,
		fontSize: fontSize.sm,
		color: colors.textSecondary,
		lineHeight: 20
	},
	link: {
		color: colors.primary,
		fontWeight: fontWeight.semibold
	},
	errorText: {
		fontSize: fontSize.sm,
		color: colors.error,
		marginBottom: spacing.md
	},
	registerButton: {
		marginTop: spacing.md
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

export default RegisterScreen;
