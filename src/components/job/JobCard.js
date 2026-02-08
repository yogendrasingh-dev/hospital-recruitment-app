import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Feather from '@react-native-vector-icons/feather';
import { colors, fontSize, fontWeight, spacing, borderRadius, shadows } from '../../theme';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const JobCard = ({ job, onPress, onSave, isSaved = false, variant = 'default' }) => {
	const scale = useSharedValue(1);
	const saveScale = useSharedValue(1);

	const animatedCardStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }]
		};
	});

	const animatedSaveStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: saveScale.value }]
		};
	});

	const handlePressIn = () => {
		scale.value = withSpring(0.98);
	};

	const handlePressOut = () => {
		scale.value = withSpring(1);
	};

	const handleSave = () => {
		saveScale.value = withSpring(0.8, {}, () => {
			saveScale.value = withSpring(1);
		});
		onSave?.();
	};

	const formatSalary = (min, max, period) => {
		const formatNumber = num => {
			if (num >= 1000) {
				return `$${(num / 1000).toFixed(0)}k`;
			}
			return `$${num}`;
		};
		return `${formatNumber(min)} - ${formatNumber(max)}/${period}`;
	};

	const getStatusColor = () => {
		switch (job.status) {
			case 'active':
				return colors.success;
			case 'closed':
				return colors.error;
			case 'draft':
				return colors.warning;
			default:
				return colors.textLight;
		}
	};

	return (
		<AnimatedTouchable
			onPress={onPress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			activeOpacity={0.9}
			style={[styles.card, animatedCardStyle]}
		>
			<View style={styles.cardContent}>
				{/* Header */}
				<View style={styles.header}>
					<Image
						source={{ uri: job.hospitalLogo }}
						style={styles.logo}
						defaultSource={require('../../assets/placeholder.png')}
					/>
					<View style={styles.headerInfo}>
						<Text style={styles.hospitalName} numberOfLines={1}>
							{job.hospitalName}
						</Text>
						<Text style={styles.location} numberOfLines={1}>
							<Feather name="map-pin" size={12} color={colors.textSecondary} /> {job.location}
						</Text>
					</View>
					<AnimatedTouchable onPress={handleSave} style={[styles.saveButton, animatedSaveStyle]}>
						<Feather
							name={isSaved ? 'heart' : 'heart'}
							size={20}
							color={isSaved ? colors.error : colors.textLight}
							fill={isSaved ? colors.error : 'none'}
						/>
					</AnimatedTouchable>
				</View>

				{/* Job Title */}
				<Text style={styles.title} numberOfLines={2}>
					{job.title}
				</Text>

				{/* Tags */}
				<View style={styles.tags}>
					<View style={[styles.tag, { backgroundColor: colors.primary + '20' }]}>
						<Feather name="briefcase" size={12} color={colors.primary} />
						<Text style={[styles.tagText, { color: colors.primary }]}>{job.positionType}</Text>
					</View>
					<View style={[styles.tag, { backgroundColor: colors.secondary + '20' }]}>
						<Feather name="clock" size={12} color={colors.secondary} />
						<Text style={[styles.tagText, { color: colors.secondary }]}>{job.shiftType}</Text>
					</View>
					<View style={[styles.tag, { backgroundColor: colors.accent + '20' }]}>
						<Feather name="calendar" size={12} color={colors.accent} />
						<Text style={[styles.tagText, { color: colors.accent }]}>{job.employmentType}</Text>
					</View>
				</View>

				{/* Footer */}
				<View style={styles.footer}>
					<View style={styles.salaryContainer}>
						<LinearGradient
							colors={[colors.success, colors.primary]}
							style={styles.salaryGradient}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
						>
							<Text style={styles.salary}>{formatSalary(job.salaryMin, job.salaryMax, job.salaryPeriod)}</Text>
						</LinearGradient>
					</View>
					<View style={styles.footerRight}>
						{job.featured && (
							<View style={styles.featuredBadge}>
								<Feather name="star" size={12} color={colors.warning} fill={colors.warning} />
								<Text style={styles.featuredText}>Featured</Text>
							</View>
						)}
						{variant === 'hospital' && (
							<View style={styles.applicantsContainer}>
								<Feather name="users" size={14} color={colors.textSecondary} />
								<Text style={styles.applicantsText}>{job.applicants} applicants</Text>
							</View>
						)}
					</View>
				</View>

				{/* Status Badge (for hospital view) */}
				{variant === 'hospital' && (
					<View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
						<Text style={styles.statusText}>{job.status.toUpperCase()}</Text>
					</View>
				)}
			</View>
		</AnimatedTouchable>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		marginBottom: spacing.md,
		overflow: 'hidden',
		...shadows.medium
	},
	cardContent: {
		padding: spacing.lg
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: spacing.md
	},
	logo: {
		width: 56,
		height: 56,
		borderRadius: borderRadius.md,
		backgroundColor: colors.borderLight
	},
	headerInfo: {
		flex: 1,
		marginLeft: spacing.md
	},
	hospitalName: {
		fontSize: fontSize.base,
		fontWeight: fontWeight.semibold,
		color: colors.textPrimary,
		marginBottom: 4
	},
	location: {
		fontSize: fontSize.sm,
		color: colors.textSecondary
	},
	saveButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: colors.borderLight,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontSize: fontSize.lg,
		fontWeight: fontWeight.bold,
		color: colors.textPrimary,
		marginBottom: spacing.md,
		lineHeight: 24
	},
	tags: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginBottom: spacing.md,
		gap: spacing.xs
	},
	tag: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: spacing.sm,
		paddingVertical: 4,
		borderRadius: borderRadius.full,
		gap: 4
	},
	tagText: {
		fontSize: fontSize.xs,
		fontWeight: fontWeight.medium
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	salaryContainer: {
		borderRadius: borderRadius.md,
		overflow: 'hidden'
	},
	salaryGradient: {
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm
	},
	salary: {
		fontSize: fontSize.base,
		fontWeight: fontWeight.bold,
		color: colors.textWhite
	},
	footerRight: {
		alignItems: 'flex-end'
	},
	featuredBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.warning + '20',
		paddingHorizontal: spacing.sm,
		paddingVertical: 4,
		borderRadius: borderRadius.full,
		gap: 4,
		marginBottom: 4
	},
	featuredText: {
		fontSize: fontSize.xs,
		fontWeight: fontWeight.semibold,
		color: colors.warning
	},
	applicantsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4
	},
	applicantsText: {
		fontSize: fontSize.xs,
		color: colors.textSecondary
	},
	statusBadge: {
		position: 'absolute',
		top: spacing.md,
		right: spacing.md,
		paddingHorizontal: spacing.sm,
		paddingVertical: 4,
		borderRadius: borderRadius.sm
	},
	statusText: {
		fontSize: fontSize.xs,
		fontWeight: fontWeight.bold,
		color: colors.textWhite
	}
});

export default JobCard;
