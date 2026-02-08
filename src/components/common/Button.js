import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { colors, fontSize, fontWeight, borderRadius, spacing } from '../../theme';

const Button = ({
	title,
	onPress,
	variant = 'primary',
	size = 'medium',
	disabled = false,
	loading = false,
	icon = null,
	fullWidth = false,
	style,
	textStyle
}) => {
	const getVariantStyle = () => {
		switch (variant) {
			case 'primary':
				return styles.primaryButton;
			case 'secondary':
				return styles.secondaryButton;
			case 'outline':
				return styles.outlineButton;
			case 'ghost':
				return styles.ghostButton;
			case 'danger':
				return styles.dangerButton;
			default:
				return styles.primaryButton;
		}
	};

	const getTextVariantStyle = () => {
		switch (variant) {
			case 'primary':
				return styles.primaryText;
			case 'secondary':
				return styles.secondaryText;
			case 'outline':
				return styles.outlineText;
			case 'ghost':
				return styles.ghostText;
			case 'danger':
				return styles.primaryText;
			default:
				return styles.primaryText;
		}
	};

	const getSizeStyle = () => {
		switch (size) {
			case 'small':
				return styles.smallButton;
			case 'medium':
				return styles.mediumButton;
			case 'large':
				return styles.largeButton;
			default:
				return styles.mediumButton;
		}
	};

	const getTextSizeStyle = () => {
		switch (size) {
			case 'small':
				return styles.smallText;
			case 'medium':
				return styles.mediumText;
			case 'large':
				return styles.largeText;
			default:
				return styles.mediumText;
		}
	};

	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled || loading}
			activeOpacity={0.8}
			style={[
				styles.button,
				getVariantStyle(),
				getSizeStyle(),
				fullWidth && styles.fullWidth,
				disabled && styles.disabled,
				style
			]}
		>
			{loading ? (
				<ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? colors.primary : colors.textWhite} />
			) : (
				<View style={styles.buttonContent}>
					{icon}
					<Text style={[styles.text, getTextVariantStyle(), getTextSizeStyle(), icon && styles.iconSpacing, textStyle]}>
						{title}
					</Text>
				</View>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: borderRadius.md,
		overflow: 'hidden'
	},
	buttonContent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontWeight: fontWeight.semibold,
		textAlign: 'center',
		includeFontPadding: false
	},
	primaryButton: {
		backgroundColor: colors.primary
	},
	secondaryButton: {
		backgroundColor: colors.secondary
	},
	outlineButton: {
		backgroundColor: 'transparent',
		borderWidth: 2,
		borderColor: colors.primary
	},
	ghostButton: {
		backgroundColor: 'transparent'
	},
	dangerButton: {
		backgroundColor: colors.error
	},
	smallButton: {
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm
	},
	mediumButton: {
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.md
	},
	largeButton: {
		paddingHorizontal: spacing.xl,
		paddingVertical: spacing.md
	},
	primaryText: {
		color: '#FFFFFF'
	},
	secondaryText: {
		color: '#FFFFFF'
	},
	outlineText: {
		color: colors.primary
	},
	ghostText: {
		color: colors.primary
	},
	smallText: {
		fontSize: fontSize.sm
	},
	mediumText: {
		fontSize: fontSize.base
	},
	largeText: {
		fontSize: fontSize.lg
	},
	fullWidth: {
		width: '100%'
	},
	disabled: {
		opacity: 0.5
	},
	iconSpacing: {
		marginLeft: spacing.sm
	}
});

export default Button;
