export const colors = {
	// Primary Healthcare Theme
	primary: '#00B4D8',
	primaryDark: '#0096C7',
	primaryLight: '#90E0EF',
	secondary: '#48CAE4',
	accent: '#023E8A',

	// Healthcare Professional Colors
	success: '#06D6A0',
	warning: '#FFB703',
	error: '#EF476F',
	info: '#118AB2',

	// Neutrals
	background: '#F8F9FA',
	surface: '#FFFFFF',
	card: '#FFFFFF',

	// Text
	textPrimary: '#212529',
	textSecondary: '#6C757D',
	textLight: '#ADB5BD',
	textWhite: '#FFFFFF',

	// Borders
	border: '#DEE2E6',
	borderLight: '#E9ECEF',

	// Dark Mode
	darkBackground: '#121212',
	darkSurface: '#1E1E1E',
	darkCard: '#2C2C2C',
	darkText: '#E0E0E0',

	// Glassmorphism
	glass: 'rgba(255, 255, 255, 0.7)',
	glassDark: 'rgba(30, 30, 30, 0.7)',

	// Gradients
	gradientStart: '#00B4D8',
	gradientEnd: '#0096C7',
	gradientAccent: '#023E8A',

	// Status Colors
	applied: '#118AB2',
	shortlisted: '#FFB703',
	interview: '#06D6A0',
	rejected: '#EF476F',
	hired: '#06D6A0'
};

export const spacing = {
	xs: 4,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32,
	xxl: 48
};

export const fontSize = {
	xs: 10,
	sm: 12,
	md: 14,
	base: 16,
	lg: 18,
	xl: 20,
	xxl: 24,
	xxxl: 32,
	huge: 48
};

export const fontWeight = {
	light: '300',
	regular: '400',
	medium: '500',
	semibold: '600',
	bold: '700',
	extrabold: '800'
};

export const borderRadius = {
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 20,
	xxl: 24,
	full: 9999
};

export const shadows = {
	small: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2
	},
	medium: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.15,
		shadowRadius: 8,
		elevation: 4
	},
	large: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.2,
		shadowRadius: 16,
		elevation: 8
	},
	xl: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 12 },
		shadowOpacity: 0.25,
		shadowRadius: 24,
		elevation: 12
	}
};

export const animations = {
	fast: 200,
	normal: 300,
	slow: 500,
	verySlow: 800
};

export default {
	colors,
	spacing,
	fontSize,
	fontWeight,
	borderRadius,
	shadows,
	animations
};
