import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Feather from '@react-native-vector-icons/feather';
import { useSelector } from 'react-redux';
import { colors, fontSize, fontWeight, spacing, borderRadius } from '../../../theme';
import { dashboardStats } from '../../../data/dummyData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const StatCard = ({ title, value, icon, color, trend, delay }) => {
	return (
		<Animated.View entering={FadeInDown.delay(delay).duration(500).springify()} style={styles.statCard}>
			<LinearGradient
				colors={[color, colors.gradientEnd]}
				style={styles.statGradient}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
				<View style={styles.statHeader}>
					<View style={styles.statIconContainer}>
						<Feather name={icon} size={24} color={colors.textWhite} />
					</View>
					{trend && (
						<View style={styles.trendContainer}>
							<Feather name={trend > 0 ? 'trending-up' : 'trending-down'} size={16} color={colors.textWhite} />
							<Text style={styles.trendText}>{Math.abs(trend)}%</Text>
						</View>
					)}
				</View>
				<Text style={styles.statValue}>{value}</Text>
				<Text style={styles.statTitle}>{title}</Text>
			</LinearGradient>
		</Animated.View>
	);
};

const QuickActionButton = ({ title, icon, color, onPress, delay }) => {
	return (
		<Animated.View entering={FadeInDown.delay(delay).duration(500)} style={styles.actionButton}>
			<TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.actionButtonInner}>
				<LinearGradient
					colors={[color, colors.gradientEnd]}
					style={styles.actionGradient}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
				>
					<Feather name={icon} size={28} color={colors.textWhite} />
				</LinearGradient>
				<Text style={styles.actionTitle}>{title}</Text>
			</TouchableOpacity>
		</Animated.View>
	);
};

const HospitalDashboardScreen = ({ navigation }) => {
	const { user } = useSelector(state => state.auth);
	const [refreshing, setRefreshing] = useState(false);
	const [stats, setStats] = useState(dashboardStats.hospital);

	const onRefresh = () => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 1500);
	};

	const quickActions = [
		{
			title: 'Post Job',
			icon: 'plus-circle',
			color: colors.primary,
			onPress: () => navigation.navigate('PostJob')
		},
		{
			title: 'Applications',
			icon: 'file-text',
			color: colors.secondary,
			onPress: () => navigation.navigate('Applications')
		},
		{
			title: 'Messages',
			icon: 'message-circle',
			color: colors.accent,
			onPress: () => navigation.navigate('Messages')
		},
		{
			title: 'Analytics',
			icon: 'bar-chart-2',
			color: colors.warning,
			onPress: () => navigation.navigate('Analytics')
		}
	];

	return (
		<View style={styles.container}>
			<LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.headerGradient}>
				<View style={styles.header}>
					<View>
						<Text style={styles.greeting}>Welcome back,</Text>
						<Text style={styles.userName}>{user?.name || 'Hospital'}</Text>
					</View>
					<TouchableOpacity style={styles.notificationButton} onPress={() => navigation.navigate('Notifications')}>
						<Feather name="bell" size={24} color={colors.textWhite} />
						<View style={styles.notificationBadge}>
							<Text style={styles.notificationBadgeText}>3</Text>
						</View>
					</TouchableOpacity>
				</View>
			</LinearGradient>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			>
				{/* Stats Grid */}
				<Animated.Text entering={FadeIn.delay(100)} style={styles.sectionTitle}>
					Overview
				</Animated.Text>

				<View style={styles.statsGrid}>
					<StatCard
						title="Active Jobs"
						value={stats.activeJobs}
						icon="briefcase"
						color={colors.primary}
						trend={12}
						delay={200}
					/>
					<StatCard
						title="Applications"
						value={stats.totalApplications}
						icon="users"
						color={colors.secondary}
						trend={8}
						delay={300}
					/>
					<StatCard
						title="Shortlisted"
						value={stats.shortlisted}
						icon="check-circle"
						color={colors.success}
						trend={-3}
						delay={400}
					/>
					<StatCard
						title="Interviews"
						value={stats.interviewsScheduled}
						icon="calendar"
						color={colors.warning}
						trend={15}
						delay={500}
					/>
				</View>

				{/* Quick Actions */}
				<Animated.Text entering={FadeIn.delay(600)} style={styles.sectionTitle}>
					Quick Actions
				</Animated.Text>

				<View style={styles.quickActionsGrid}>
					{quickActions.map((action, index) => (
						<QuickActionButton
							key={index}
							title={action.title}
							icon={action.icon}
							color={action.color}
							onPress={action.onPress}
							delay={700 + index * 100}
						/>
					))}
				</View>

				{/* Recent Activity */}
				<Animated.View entering={FadeInDown.delay(1100).duration(500)} style={styles.activitySection}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Recent Activity</Text>
						<TouchableOpacity>
							<Text style={styles.seeAll}>See All</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.activityCard}>
						<View style={styles.activityItem}>
							<View style={[styles.activityIcon, { backgroundColor: colors.success + '20' }]}>
								<Feather name="user-check" size={20} color={colors.success} />
							</View>
							<View style={styles.activityContent}>
								<Text style={styles.activityTitle}>New Application</Text>
								<Text style={styles.activitySubtitle}>Dr. Sarah Johnson applied for Senior Cardiologist</Text>
								<Text style={styles.activityTime}>2 hours ago</Text>
							</View>
						</View>

						<View style={styles.activityItem}>
							<View style={[styles.activityIcon, { backgroundColor: colors.primary + '20' }]}>
								<Feather name="briefcase" size={20} color={colors.primary} />
							</View>
							<View style={styles.activityContent}>
								<Text style={styles.activityTitle}>Job Posted</Text>
								<Text style={styles.activitySubtitle}>ICU Registered Nurse position is now live</Text>
								<Text style={styles.activityTime}>5 hours ago</Text>
							</View>
						</View>

						<View style={styles.activityItem}>
							<View style={[styles.activityIcon, { backgroundColor: colors.warning + '20' }]}>
								<Feather name="calendar" size={20} color={colors.warning} />
							</View>
							<View style={styles.activityContent}>
								<Text style={styles.activityTitle}>Interview Scheduled</Text>
								<Text style={styles.activitySubtitle}>Interview with Emily Davis on Feb 8</Text>
								<Text style={styles.activityTime}>1 day ago</Text>
							</View>
						</View>
					</View>
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
	notificationButton: {
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
		margin: spacing.xs,
		borderRadius: borderRadius.lg,
		overflow: 'hidden',
		elevation: 4,
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8
	},
	statGradient: {
		padding: spacing.lg
	},
	statHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: spacing.md
	},
	statIconContainer: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		justifyContent: 'center',
		alignItems: 'center'
	},
	trendContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		paddingHorizontal: spacing.sm,
		paddingVertical: 4,
		borderRadius: borderRadius.full
	},
	trendText: {
		fontSize: fontSize.xs,
		fontWeight: fontWeight.bold,
		color: colors.textWhite,
		marginLeft: 4
	},
	statValue: {
		fontSize: fontSize.xxxl,
		fontWeight: fontWeight.extrabold,
		color: colors.textWhite,
		marginBottom: spacing.xs
	},
	statTitle: {
		fontSize: fontSize.sm,
		color: 'rgba(255, 255, 255, 0.9)',
		fontWeight: fontWeight.medium
	},
	quickActionsGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginHorizontal: -spacing.xs,
		marginBottom: spacing.xl
	},
	actionButton: {
		width: (SCREEN_WIDTH - spacing.xl * 2 - spacing.xs * 2) / 2,
		margin: spacing.xs
	},
	actionButtonInner: {
		alignItems: 'center'
	},
	actionGradient: {
		width: '100%',
		aspectRatio: 1,
		borderRadius: borderRadius.lg,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: spacing.sm,
		elevation: 4,
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8
	},
	actionTitle: {
		fontSize: fontSize.sm,
		fontWeight: fontWeight.semibold,
		color: colors.textPrimary,
		textAlign: 'center'
	},
	activitySection: {
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
	activityCard: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4
	},
	activityItem: {
		flexDirection: 'row',
		marginBottom: spacing.lg
	},
	activityIcon: {
		width: 48,
		height: 48,
		borderRadius: 24,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: spacing.md
	},
	activityContent: {
		flex: 1
	},
	activityTitle: {
		fontSize: fontSize.base,
		fontWeight: fontWeight.semibold,
		color: colors.textPrimary,
		marginBottom: 4
	},
	activitySubtitle: {
		fontSize: fontSize.sm,
		color: colors.textSecondary,
		marginBottom: 4
	},
	activityTime: {
		fontSize: fontSize.xs,
		color: colors.textLight
	}
});

export default HospitalDashboardScreen;
