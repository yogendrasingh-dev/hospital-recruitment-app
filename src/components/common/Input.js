import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, interpolateColor } from 'react-native-reanimated';
import Feather from '@react-native-vector-icons/feather';
import { colors, fontSize, fontWeight, borderRadius, spacing } from '../../theme';

const AnimatedView = Animated.createAnimatedComponent(View);

const Input = ({
	label,
	value,
	onChangeText,
	placeholder,
	secureTextEntry = false,
	keyboardType = 'default',
	autoCapitalize = 'sentences',
	error = null,
	disabled = false,
	multiline = false,
	numberOfLines = 1,
	leftIcon = null,
	rightIcon = null,
	onRightIconPress = null,
	style,
	inputStyle
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const [isSecure, setIsSecure] = useState(secureTextEntry);
	const focusAnimation = useSharedValue(0);

	const animatedBorderStyle = useAnimatedStyle(() => {
		return {
			borderColor: interpolateColor(
				focusAnimation.value,
				[0, 1],
				[error ? colors.error : colors.border, colors.primary]
			),
			borderWidth: focusAnimation.value === 1 ? 2 : 1
		};
	});

	const handleFocus = () => {
		setIsFocused(true);
		focusAnimation.value = withTiming(1, { duration: 200 });
	};

	const handleBlur = () => {
		setIsFocused(false);
		focusAnimation.value = withTiming(0, { duration: 200 });
	};

	const toggleSecure = () => {
		setIsSecure(!isSecure);
	};

	return (
		<View style={[styles.container, style]}>
			{label && (
				<Text style={[styles.label, isFocused && styles.labelFocused, error && styles.labelError]}>{label}</Text>
			)}
			<AnimatedView style={[styles.inputContainer, animatedBorderStyle, disabled && styles.disabled]}>
				{leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
				<TextInput
					value={value}
					onChangeText={onChangeText}
					placeholder={placeholder}
					placeholderTextColor={colors.textLight}
					secureTextEntry={isSecure}
					keyboardType={keyboardType}
					autoCapitalize={autoCapitalize}
					editable={!disabled}
					multiline={multiline}
					numberOfLines={numberOfLines}
					onFocus={handleFocus}
					onBlur={handleBlur}
					style={[
						styles.input,
						multiline && styles.multilineInput,
						leftIcon && styles.inputWithLeftIcon,
						(rightIcon || secureTextEntry) && styles.inputWithRightIcon,
						inputStyle
					]}
				/>
				{secureTextEntry && (
					<TouchableOpacity onPress={toggleSecure} style={styles.rightIcon}>
						<Feather name={isSecure ? 'eye-off' : 'eye'} size={20} color={colors.textSecondary} />
					</TouchableOpacity>
				)}
				{rightIcon && !secureTextEntry && (
					<TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
						{rightIcon}
					</TouchableOpacity>
				)}
			</AnimatedView>
			{error && <Text style={styles.errorText}>{error}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: spacing.md
	},
	label: {
		fontSize: fontSize.sm,
		fontWeight: fontWeight.medium,
		color: colors.textSecondary,
		marginBottom: spacing.xs
	},
	labelFocused: {
		color: colors.primary
	},
	labelError: {
		color: colors.error
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.surface,
		borderRadius: borderRadius.md,
		borderWidth: 1,
		borderColor: colors.border,
		paddingHorizontal: spacing.md,
		minHeight: 48
	},
	input: {
		flex: 1,
		fontSize: fontSize.base,
		color: colors.textPrimary,
		paddingVertical: spacing.sm
	},
	multilineInput: {
		minHeight: 100,
		textAlignVertical: 'top',
		paddingTop: spacing.md
	},
	inputWithLeftIcon: {
		marginLeft: spacing.sm
	},
	inputWithRightIcon: {
		marginRight: spacing.sm
	},
	leftIcon: {
		marginRight: spacing.xs
	},
	rightIcon: {
		padding: spacing.xs
	},
	disabled: {
		backgroundColor: colors.borderLight,
		opacity: 0.6
	},
	errorText: {
		fontSize: fontSize.sm,
		color: colors.error,
		marginTop: spacing.xs
	}
});

export default Input;
