import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
	withSequence,
	Easing
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { colors, borderRadius, spacing } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SkeletonLoader = ({ width = '100%', height = 20, borderRadius: radius = borderRadius.md, style }) => {
	const opacity = useSharedValue(0.3);

	useEffect(() => {
		opacity.value = withRepeat(
			withSequence(
				withTiming(1, { duration: 800, easing: Easing.ease }),
				withTiming(0.3, { duration: 800, easing: Easing.ease })
			),
			-1,
			false
		);
	}, []);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value
		};
	});

	return <Animated.View style={[styles.skeleton, { width, height, borderRadius: radius }, animatedStyle, style]} />;
};

export const SkeletonCard = () => {
	return (
		<View style={styles.card}>
			<View style={styles.cardHeader}>
				<SkeletonLoader width={60} height={60} borderRadius={borderRadius.md} />
				<View style={styles.cardHeaderText}>
					<SkeletonLoader width="80%" height={20} />
					<SkeletonLoader width="60%" height={16} style={{ marginTop: spacing.sm }} />
				</View>
			</View>
			<SkeletonLoader width="100%" height={16} style={{ marginTop: spacing.md }} />
			<SkeletonLoader width="90%" height={16} style={{ marginTop: spacing.sm }} />
			<SkeletonLoader width="70%" height={16} style={{ marginTop: spacing.sm }} />
			<View style={styles.cardFooter}>
				<SkeletonLoader width={80} height={30} borderRadius={borderRadius.full} />
				<SkeletonLoader width={80} height={30} borderRadius={borderRadius.full} />
			</View>
		</View>
	);
};

export const SkeletonList = ({ count = 3 }) => {
	return (
		<View>
			{Array.from({ length: count }).map((_, index) => (
				<SkeletonCard key={index} />
			))}
		</View>
	);
};

export const SkeletonProfile = () => {
	return (
		<View style={styles.profileContainer}>
			<SkeletonLoader
				width={120}
				height={120}
				borderRadius={borderRadius.full}
				style={{ alignSelf: 'center', marginBottom: spacing.lg }}
			/>
			<SkeletonLoader width="60%" height={24} style={{ alignSelf: 'center' }} />
			<SkeletonLoader width="40%" height={18} style={{ alignSelf: 'center', marginTop: spacing.sm }} />
			<View style={styles.profileStats}>
				{[1, 2, 3].map(item => (
					<View key={item} style={styles.statItem}>
						<SkeletonLoader width={60} height={40} />
						<SkeletonLoader width={80} height={16} style={{ marginTop: spacing.xs }} />
					</View>
				))}
			</View>
			<View style={{ marginTop: spacing.xl }}>
				<SkeletonLoader width="100%" height={20} />
				<SkeletonLoader width="100%" height={16} style={{ marginTop: spacing.md }} />
				<SkeletonLoader width="90%" height={16} style={{ marginTop: spacing.sm }} />
				<SkeletonLoader width="95%" height={16} style={{ marginTop: spacing.sm }} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	skeleton: {
		backgroundColor: colors.borderLight
	},
	card: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		marginBottom: spacing.md,
		...colors.shadows?.medium
	},
	cardHeader: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	cardHeaderText: {
		flex: 1,
		marginLeft: spacing.md
	},
	cardFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: spacing.lg
	},
	profileContainer: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.xl
	},
	profileStats: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: spacing.xl
	},
	statItem: {
		alignItems: 'center'
	}
});

export default SkeletonLoader;
