import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	RefreshControl,
	Dimensions,
	FlatList
} from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Feather from '@react-native-vector-icons/feather';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSaveJob } from '../../../store/slices/jobSlice';
import { colors, fontSize, fontWeight, spacing, borderRadius } from '../../../theme';
import { dashboardStats } from '../../../data/dummyData';
import JobCard from '../../../components/job/JobCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ProfileCompletionCard = ({ percentage, delay }) => {
	return (
		<Animated.View entering={FadeInDown.delay(delay).duration(500)} style={styles.profileCard}>
			<LinearGradient
				colors={[colors.primary, colors.secondary]}
				style={styles.profileGradient}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
				<View style={styles.profileHeader}>
					<Feather name="user" size={24} color={colors.textWhite} />
					<Text style={styles.profileTitle}>Complete Your Profile</Text>
				</View>
				<Text style={styles.profileSubtitle}>{percentage}% complete • Stand out to employers</Text>
				<View style={styles.progressBar}>
					<View style={[styles.progressFill, { width: `${percentage}%` }]} />
				</View>
				<TouchableOpacity style={styles.completeButton}>
					<Text style={styles.completeButtonText}>Complete Now</Text>
					<Feather name="arrow-right" size={16} color={colors.primary} />
				</TouchableOpacity>
			</LinearGradient>
		</Animated.View>
	);
};

const StatCard = ({ title, value, icon, color, delay }) => {
	return (
		<Animated.View entering={FadeInDown.delay(delay).duration(500)} style={styles.statCard}>
			<View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
				<Feather name={icon} size={24} color={color} />
			</View>
			<Text style={styles.statValue}>{value}</Text>
			<Text style={styles.statTitle}>{title}</Text>
		</Animated.View>
	);
};

const ProfessionalDashboardScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.auth);
	const { jobs, savedJobs } = useSelector(state => state.job);
	const [refreshing, setRefreshing] = useState(false);
	const [stats] = useState(dashboardStats.professional);

	const recommendedJobs = jobs.filter(job => job.featured).slice(0, 5);

	const onRefresh = () => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 1500);
	};

	const handleSaveJob = jobId => {
		dispatch(toggleSaveJob(jobId));
	};

	const handleJobPress = job => {
		navigation.navigate('JobDetail', { job });
	};

	return (
		<View style={styles.container}>
			<LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.headerGradient}>
				<View style={styles.header}>
					<View>
						<Text style={styles.greeting}>Hello,</Text>
						<Text style={styles.userName}>{user?.name || 'Professional'}</Text>
					</View>
					<View style={styles.headerActions}>
						<TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Search')}>
							<Feather name="search" size={24} color={colors.textWhite} />
						</TouchableOpacity>
						<TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Notifications')}>
							<Feather name="bell" size={24} color={colors.textWhite} />
							<View style={styles.notificationBadge}>
								<Text style={styles.notificationBadgeText}>2</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</LinearGradient>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			>
				{/* Profile Completion */}
				<ProfileCompletionCard percentage={stats.profileCompletion} delay={100} />

				{/* Stats */}
				<Animated.Text entering={FadeIn.delay(200)} style={styles.sectionTitle}>
					Your Activity
				</Animated.Text>

				<View style={styles.statsGrid}>
					<StatCard title="Applied" value={stats.appliedJobs} icon="file-text" color={colors.primary} delay={300} />
					<StatCard title="Saved" value={stats.saved} icon="heart" color={colors.error} delay={400} />
					<StatCard
						title="Shortlisted"
						value={stats.shortlisted}
						icon="check-circle"
						color={colors.success}
						delay={500}
					/>
					<StatCard title="Interviews" value={stats.interviews} icon="calendar" color={colors.warning} delay={600} />
				</View>

				{/* Recommended Jobs */}
				<Animated.View entering={FadeIn.delay(700)} style={styles.jobsSection}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Recommended for You</Text>
						<TouchableOpacity onPress={() => navigation.navigate('Jobs')}>
							<Text style={styles.seeAll}>See All</Text>
						</TouchableOpacity>
					</View>

					{recommendedJobs.map((job, index) => (
						<Animated.View key={job.id} entering={FadeInDown.delay(800 + index * 100).duration(500)}>
							<JobCard
								job={job}
								onPress={() => handleJobPress(job)}
								onSave={() => handleSaveJob(job.id)}
								isSaved={savedJobs.includes(job.id)}
							/>
						</Animated.View>
					))}
				</Animated.View>

				{/* Quick Actions */}
				<Animated.View entering={FadeInDown.delay(1300).duration(500)} style={styles.quickActions}>
					<TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('SavedJobs')}>
						<LinearGradient
							colors={[colors.error, '#FF6B9D']}
							style={styles.actionGradient}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
						>
							<Feather name="heart" size={32} color={colors.textWhite} />
							<Text style={styles.actionTitle}>Saved Jobs</Text>
							<Text style={styles.actionSubtitle}>{stats.saved} jobs saved</Text>
						</LinearGradient>
					</TouchableOpacity>

					<TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Applications')}>
						<LinearGradient
							colors={[colors.primary, colors.secondary]}
							style={styles.actionGradient}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
						>
							<Feather name="briefcase" size={32} color={colors.textWhite} />
							<Text style={styles.actionTitle}>My Applications</Text>
							<Text style={styles.actionSubtitle}>{stats.appliedJobs} applications</Text>
						</LinearGradient>
					</TouchableOpacity>
				</Animated.View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background
	},
	headerGradient: {
		paddingTop: 50,
		paddingBottom: spacing.xl,
		paddingHorizontal: spacing.xl,
		borderBottomLeftRadius: borderRadius.xxl,
		borderBottomRightRadius: borderRadius.xxl
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	greeting: {
		fontSize: fontSize.base,
		color: 'rgba(255, 255, 255, 0.9)',
		fontWeight: fontWeight.medium
	},
	userName: {
		fontSize: fontSize.xxl,
		fontWeight: fontWeight.bold,
		color: colors.textWhite,
		marginTop: spacing.xs
	},
	headerActions: {
		flexDirection: 'row',
		gap: spacing.sm
	},
	headerButton: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		justifyContent: 'center',
		alignItems: 'center'
	},
	notificationBadge: {
		position: 'absolute',
		top: 8,
		right: 8,
		width: 18,
		height: 18,
		borderRadius: 9,
		backgroundColor: colors.error,
		justifyContent: 'center',
		alignItems: 'center'
	},
	notificationBadgeText: {
		fontSize: 10,
		fontWeight: fontWeight.bold,
		color: colors.textWhite
	},
	scrollContent: {
		padding: spacing.xl
	},
	profileCard: {
		borderRadius: borderRadius.lg,
		overflow: 'hidden',
		marginBottom: spacing.xl,
		elevation: 4,
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8
	},
	profileGradient: {
		padding: spacing.lg
	},
	profileHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: spacing.sm
	},
	profileTitle: {
		fontSize: fontSize.lg,
		fontWeight: fontWeight.bold,
		color: colors.textWhite,
		marginLeft: spacing.sm
	},
	profileSubtitle: {
		fontSize: fontSize.sm,
		color: 'rgba(255, 255, 255, 0.9)',
		marginBottom: spacing.md
	},
	progressBar: {
		height: 8,
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		borderRadius: 4,
		marginBottom: spacing.md,
		overflow: 'hidden'
	},
	progressFill: {
		height: '100%',
		backgroundColor: colors.textWhite,
		borderRadius: 4
	},
	completeButton: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.textWhite,
		alignSelf: 'flex-start',
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
		borderRadius: borderRadius.full,
		gap: spacing.xs
	},
	completeButtonText: {
		fontSize: fontSize.sm,
		fontWeight: fontWeight.semibold,
		color: colors.primary
	},
	sectionTitle: {
		fontSize: fontSize.xl,
		fontWeight: fontWeight.bold,
		color: colors.textPrimary,
		marginBottom: spacing.md
	},
	statsGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginHorizontal: -spacing.xs,
		marginBottom: spacing.xl
	},
	statCard: {
		width: (SCREEN_WIDTH - spacing.xl * 2 - spacing.xs * 2) / 2,
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		margin: spacing.xs,
		alignItems: 'center',
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4
	},
	statIcon: {
		width: 56,
		height: 56,
		borderRadius: 28,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: spacing.sm
	},
	statValue: {
		fontSize: fontSize.xxl,
		fontWeight: fontWeight.bold,
		color: colors.textPrimary,
		marginBottom: 4
	},
	statTitle: {
		fontSize: fontSize.sm,
		color: colors.textSecondary,
		textAlign: 'center'
	},
	jobsSection: {
		marginBottom: spacing.xl
	},
	sectionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: spacing.md
	},
	seeAll: {
		fontSize: fontSize.sm,
		color: colors.primary,
		fontWeight: fontWeight.semibold
	},
	quickActions: {
		flexDirection: 'row',
		gap: spacing.md,
		marginBottom: spacing.xl
	},
	actionCard: {
		flex: 1,
		borderRadius: borderRadius.lg,
		overflow: 'hidden',
		elevation: 4,
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8
	},
	actionGradient: {
		padding: spacing.lg,
		alignItems: 'center',
		minHeight: 140,
		justifyContent: 'center'
	},
	actionTitle: {
		fontSize: fontSize.base,
		fontWeight: fontWeight.bold,
		color: colors.textWhite,
		marginTop: spacing.sm,
		textAlign: 'center'
	},
	actionSubtitle: {
		fontSize: fontSize.xs,
		color: 'rgba(255, 255, 255, 0.9)',
		marginTop: 4,
		textAlign: 'center'
	}
});

export default ProfessionalDashboardScreen;
