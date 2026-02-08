import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import Animated, {
	FadeIn,
	FadeInDown,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
	interpolate,
	Extrapolate
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Feather from '@react-native-vector-icons/feather';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSaveJob } from '../../store/slices/jobSlice';
import { addApplication } from '../../store/slices/applicationSlice';
import { colors, fontSize, fontWeight, spacing, borderRadius, shadows } from '../../theme';
import Button from '../../components/common/Button';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = 300;

const JobDetailScreen = ({ route, navigation }) => {
	const { job } = route.params;
	const dispatch = useDispatch();
	const { savedJobs } = useSelector(state => state.job);
	const { userRole } = useSelector(state => state.auth);
	const [applying, setApplying] = useState(false);

	const scrollY = useSharedValue(0);
	const isSaved = savedJobs.includes(job.id);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: event => {
			scrollY.value = event.contentOffset.y;
		}
	});

	const headerAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(scrollY.value, [0, HEADER_HEIGHT], [0, -HEADER_HEIGHT / 2], Extrapolate.CLAMP)
				},
				{
					scale: interpolate(scrollY.value, [-HEADER_HEIGHT, 0], [2, 1], Extrapolate.CLAMP)
				}
			]
		};
	});

	const headerOpacityStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(scrollY.value, [0, HEADER_HEIGHT / 2], [1, 0], Extrapolate.CLAMP)
		};
	});

	const handleSave = () => {
		dispatch(toggleSaveJob(job.id));
	};

	const handleApply = () => {
		setApplying(true);
		setTimeout(() => {
			const application = {
				id: `a${Date.now()}`,
				jobId: job.id,
				jobTitle: job.title,
				hospitalName: job.hospitalName,
				status: 'applied',
				appliedDate: new Date().toISOString().split('T')[0],
				lastUpdated: new Date().toISOString().split('T')[0]
			};
			dispatch(addApplication(application));
			setApplying(false);
			navigation.goBack();
		}, 1500);
	};

	const InfoRow = ({ icon, label, value }) => (
		<View style={styles.infoRow}>
			<View style={styles.infoIcon}>
				<Feather name={icon} size={20} color={colors.primary} />
			</View>
			<View style={styles.infoContent}>
				<Text style={styles.infoLabel}>{label}</Text>
				<Text style={styles.infoValue}>{value}</Text>
			</View>
		</View>
	);

	return (
		<View style={styles.container}>
			{/* Animated Header */}
			<Animated.View style={[styles.header, headerAnimatedStyle]}>
				<LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.headerGradient}>
					<Animated.View style={[styles.headerContent, headerOpacityStyle]}>
						<Image source={{ uri: job.hospitalLogo }} style={styles.hospitalLogo} />
						<Text style={styles.jobTitle}>{job.title}</Text>
						<Text style={styles.hospitalName}>{job.hospitalName}</Text>
						<View style={styles.locationContainer}>
							<Feather name="map-pin" size={16} color="rgba(255,255,255,0.9)" />
							<Text style={styles.location}>{job.location}</Text>
						</View>
					</Animated.View>
				</LinearGradient>
			</Animated.View>

			{/* Scrollable Content */}
			<Animated.ScrollView
				onScroll={scrollHandler}
				scrollEventThrottle={16}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				{/* Spacer for header */}
				<View style={{ height: HEADER_HEIGHT - 80 }} />

				{/* Info Cards */}
				<Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.card}>
					<View style={styles.infoGrid}>
						<InfoRow
							icon="dollar-sign"
							label="Salary"
							value={`$${job.salaryMin / 1000}k - $${job.salaryMax / 1000}k/${job.salaryPeriod}`}
						/>
						<InfoRow icon="briefcase" label="Position" value={job.positionType} />
						<InfoRow icon="clock" label="Shift" value={job.shiftType} />
						<InfoRow icon="calendar" label="Type" value={job.employmentType} />
						<InfoRow icon="award" label="Experience" value={`${job.experienceRequired}+ years`} />
						<InfoRow icon="users" label="Openings" value={`${job.openings} position${job.openings > 1 ? 's' : ''}`} />
					</View>
				</Animated.View>

				{/* Description */}
				<Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.card}>
					<Text style={styles.sectionTitle}>About the Job</Text>
					<Text style={styles.description}>{job.description}</Text>
				</Animated.View>

				{/* Requirements */}
				<Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.card}>
					<Text style={styles.sectionTitle}>Requirements</Text>
					{job.requirements.map((req, index) => (
						<View key={index} style={styles.listItem}>
							<View style={styles.bullet}>
								<Feather name="check" size={14} color={colors.success} />
							</View>
							<Text style={styles.listText}>{req}</Text>
						</View>
					))}
				</Animated.View>

				{/* Responsibilities */}
				<Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.card}>
					<Text style={styles.sectionTitle}>Responsibilities</Text>
					{job.responsibilities.map((resp, index) => (
						<View key={index} style={styles.listItem}>
							<View style={styles.bullet}>
								<Text style={styles.bulletText}>•</Text>
							</View>
							<Text style={styles.listText}>{resp}</Text>
						</View>
					))}
				</Animated.View>

				{/* Benefits */}
				<Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.card}>
					<Text style={styles.sectionTitle}>Benefits</Text>
					<View style={styles.benefitsGrid}>
						{job.benefits.map((benefit, index) => (
							<View key={index} style={styles.benefitChip}>
								<Feather name="check-circle" size={16} color={colors.success} />
								<Text style={styles.benefitText}>{benefit}</Text>
							</View>
						))}
					</View>
				</Animated.View>

				<View style={{ height: 100 }} />
			</Animated.ScrollView>

			{/* Bottom Action Bar */}
			{userRole === 'professional' && (
				<Animated.View entering={FadeIn.delay(600)} style={styles.bottomBar}>
					<TouchableOpacity onPress={handleSave} style={styles.saveButton}>
						<Feather
							name="heart"
							size={24}
							color={isSaved ? colors.error : colors.textPrimary}
							fill={isSaved ? colors.error : 'none'}
						/>
					</TouchableOpacity>
					<Button
						title={applying ? 'Applying...' : 'Apply Now'}
						onPress={handleApply}
						loading={applying}
						gradient
						style={styles.applyButton}
					/>
				</Animated.View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background
	},
	header: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: HEADER_HEIGHT,
		zIndex: 1
	},
	headerGradient: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	headerContent: {
		alignItems: 'center',
		paddingHorizontal: spacing.xl
	},
	hospitalLogo: {
		width: 80,
		height: 80,
		borderRadius: borderRadius.lg,
		backgroundColor: colors.surface,
		marginBottom: spacing.md
	},
	jobTitle: {
		fontSize: fontSize.xxl,
		fontWeight: fontWeight.bold,
		color: colors.textWhite,
		textAlign: 'center',
		marginBottom: spacing.xs
	},
	hospitalName: {
		fontSize: fontSize.lg,
		color: 'rgba(255, 255, 255, 0.9)',
		fontWeight: fontWeight.medium,
		marginBottom: spacing.xs
	},
	locationContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4
	},
	location: {
		fontSize: fontSize.base,
		color: 'rgba(255, 255, 255, 0.9)'
	},
	scrollContent: {
		paddingHorizontal: spacing.xl
	},
	card: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		marginBottom: spacing.md,
		...shadows.medium
	},
	infoGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginHorizontal: -spacing.xs
	},
	infoRow: {
		width: '50%',
		flexDirection: 'row',
		alignItems: 'center',
		padding: spacing.xs,
		marginBottom: spacing.sm
	},
	infoIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: colors.primary + '20',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: spacing.sm
	},
	infoContent: {
		flex: 1
	},
	infoLabel: {
		fontSize: fontSize.xs,
		color: colors.textSecondary,
		marginBottom: 2
	},
	infoValue: {
		fontSize: fontSize.sm,
		fontWeight: fontWeight.semibold,
		color: colors.textPrimary
	},
	sectionTitle: {
		fontSize: fontSize.lg,
		fontWeight: fontWeight.bold,
		color: colors.textPrimary,
		marginBottom: spacing.md
	},
	description: {
		fontSize: fontSize.base,
		color: colors.textSecondary,
		lineHeight: 24
	},
	listItem: {
		flexDirection: 'row',
		marginBottom: spacing.sm
	},
	bullet: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: colors.success + '20',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: spacing.sm,
		marginTop: 2
	},
	bulletText: {
		fontSize: fontSize.lg,
		color: colors.primary,
		fontWeight: fontWeight.bold
	},
	listText: {
		flex: 1,
		fontSize: fontSize.base,
		color: colors.textSecondary,
		lineHeight: 24
	},
	benefitsGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: spacing.sm
	},
	benefitChip: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.success + '20',
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
		borderRadius: borderRadius.full,
		gap: spacing.xs
	},
	benefitText: {
		fontSize: fontSize.sm,
		color: colors.success,
		fontWeight: fontWeight.medium
	},
	bottomBar: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.surface,
		paddingHorizontal: spacing.xl,
		paddingVertical: spacing.md,
		borderTopWidth: 1,
		borderTopColor: colors.borderLight,
		gap: spacing.md,
		...shadows.large
	},
	saveButton: {
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: colors.borderLight,
		justifyContent: 'center',
		alignItems: 'center'
	},
	applyButton: {
		flex: 1
	}
});

export default JobDetailScreen;
