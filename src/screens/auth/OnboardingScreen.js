import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity, FlatList, Image } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
	withDelay,
	interpolate,
	Extrapolate,
	FadeIn,
	FadeInDown,
	FadeInUp,
	SlideInRight,
	BounceIn
} from 'react-native-reanimated';
import Feather from '@react-native-vector-icons/feather';
import { colors, fontSize, fontWeight, spacing, borderRadius } from '../../theme';
import Button from '../../components/common/Button';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const OnboardingItem = ({ item, index, currentIndex }) => {
	const isFirstScreen = index === 0;

	// Shared values to track initial state
	const iconOpacity = useSharedValue(isFirstScreen && index === 0 ? 0 : index === currentIndex ? 1 : 0);
	const iconScale = useSharedValue(isFirstScreen && index === 0 ? 0.5 : index === currentIndex ? 1 : 0.5);
	const titleOpacity = useSharedValue(isFirstScreen && index === 0 ? 0 : index === currentIndex ? 1 : 0);
	const titleY = useSharedValue(isFirstScreen && index === 0 ? -20 : index === currentIndex ? 0 : -20);
	const descOpacity = useSharedValue(isFirstScreen && index === 0 ? 0 : index === currentIndex ? 1 : 0);
	const descY = useSharedValue(isFirstScreen && index === 0 ? 20 : index === currentIndex ? 0 : 20);

	React.useEffect(() => {
		const isVisible = index === currentIndex;
		const duration = isFirstScreen ? 800 : 500;

		// Add staggered delays for first screen on mount
		if (isFirstScreen && index === 0) {
			// Icon animates first
			iconOpacity.value = withDelay(200, withTiming(isVisible ? 1 : 0, { duration }));
			iconScale.value = withDelay(200, withSpring(isVisible ? 1 : 0.5, { damping: 15 }));

			// Title animates second
			titleOpacity.value = withDelay(500, withTiming(isVisible ? 1 : 0, { duration: 600 }));
			titleY.value = withDelay(500, withSpring(isVisible ? 0 : -20, { damping: 20 }));

			// Description animates last
			descOpacity.value = withDelay(800, withTiming(isVisible ? 1 : 0, { duration: 600 }));
			descY.value = withDelay(800, withSpring(isVisible ? 0 : 20, { damping: 20 }));
		} else {
			// Regular animations for other screens
			iconOpacity.value = withTiming(isVisible ? 1 : 0, { duration });
			iconScale.value = withSpring(isVisible ? 1 : 0.5, { damping: 15 });
			titleOpacity.value = withTiming(isVisible ? 1 : 0, { duration: isFirstScreen ? 600 : 400 });
			titleY.value = withSpring(isVisible ? 0 : -20, { damping: 20 });
			descOpacity.value = withTiming(isVisible ? 1 : 0, { duration: isFirstScreen ? 600 : 400 });
			descY.value = withSpring(isVisible ? 0 : 20, { damping: 20 });
		}
	}, [currentIndex, index]);

	const iconAnimStyle = useAnimatedStyle(() => ({
		opacity: iconOpacity.value,
		transform: [{ scale: iconScale.value }]
	}));

	const titleAnimStyle = useAnimatedStyle(() => ({
		opacity: titleOpacity.value,
		transform: [{ translateY: titleY.value }]
	}));

	const descAnimStyle = useAnimatedStyle(() => ({
		opacity: descOpacity.value,
		transform: [{ translateY: descY.value }]
	}));

	return (
		<View style={styles.slide}>
			<Animated.View style={[styles.iconContainer, iconAnimStyle]}>
				<View style={[styles.iconCircle, { backgroundColor: item.color }]}>
					<Feather name={item.icon} size={100} color={colors.textWhite} />
				</View>
			</Animated.View>
			<Animated.Text style={[styles.title, titleAnimStyle]}>{item.title}</Animated.Text>
			<Animated.Text style={[styles.description, descAnimStyle]}>{item.description}</Animated.Text>
		</View>
	);
};

const onboardingData = [
	{
		id: '1',
		title: 'Connect Healthcare Professionals & Hospitals',
		description: 'The ultimate platform bridging talented healthcare professionals with leading medical institutions.',
		icon: 'heart',
		color: colors.primary
	},
	{
		id: '2',
		title: 'Find Your Perfect Match',
		description:
			'Professionals discover dream jobs while hospitals find qualified candidates with verified credentials.',
		icon: 'search',
		color: colors.success
	},
	{
		id: '3',
		title: 'Streamlined Hiring Process',
		description: 'Post jobs, browse profiles, apply instantly, and manage applications all in one powerful platform.',
		icon: 'zap',
		color: colors.accent
	},
	{
		id: '4',
		title: 'Verified Profiles & Credentials',
		description:
			'Trust in verified qualifications, certifications, and experience for both professionals and hospitals.',
		icon: 'shield',
		color: colors.info
	},
	{
		id: '5',
		title: 'Grow Together',
		description: 'Build your career or team with real-time notifications, chat, and comprehensive recruitment tools.',
		icon: 'trending-up',
		color: colors.warning
	}
];

const OnboardingScreen = ({ navigation }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const flatListRef = useRef(null);
	const scrollX = useSharedValue(0);

	const handleNext = () => {
		if (currentIndex < onboardingData.length - 1) {
			flatListRef.current?.scrollToIndex({
				index: currentIndex + 1,
				animated: true
			});
		} else {
			navigation.replace('RoleSelection');
		}
	};

	const handleSkip = () => {
		navigation.replace('RoleSelection');
	};

	const onViewableItemsChanged = useRef(({ viewableItems }) => {
		if (viewableItems.length > 0) {
			setCurrentIndex(viewableItems[0].index || 0);
		}
	}).current;

	const viewabilityConfig = {
		itemVisiblePercentThreshold: 50
	};

	const renderItem = ({ item, index }) => {
		return <OnboardingItem item={item} index={index} currentIndex={currentIndex} />;
	};

	const Pagination = () => {
		return (
			<View style={styles.pagination}>
				{onboardingData.map((_, index) => {
					const animatedDotStyle = useAnimatedStyle(() => {
						const inputRange = [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH];

						const width = interpolate(scrollX.value, inputRange, [8, 24, 8], Extrapolate.CLAMP);

						const opacity = interpolate(scrollX.value, inputRange, [0.3, 1, 0.3], Extrapolate.CLAMP);

						return { width, opacity };
					});

					return <Animated.View key={index} style={[styles.dot, animatedDotStyle]} />;
				})}
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<StatusBar barStyle="dark-content" backgroundColor={colors.background} />

			<TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
				<Animated.Text style={styles.skipText} entering={FadeIn.delay(300)}>
					Skip
				</Animated.Text>
			</TouchableOpacity>

			<FlatList
				ref={flatListRef}
				data={onboardingData}
				renderItem={renderItem}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={event => {
					scrollX.value = event.nativeEvent.contentOffset.x;
				}}
				onViewableItemsChanged={onViewableItemsChanged}
				viewabilityConfig={viewabilityConfig}
				scrollEventThrottle={16}
				keyExtractor={item => item.id}
			/>

			<Animated.View style={styles.footer} entering={FadeInUp.delay(800).duration(600)}>
				<Pagination />
				<Button
					title={currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
					onPress={handleNext}
					fullWidth
					size="large"
				/>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background
	},
	skipButton: {
		position: 'absolute',
		top: 50,
		right: 20,
		zIndex: 10,
		padding: spacing.sm
	},
	skipText: {
		fontSize: fontSize.base,
		color: colors.textSecondary,
		fontWeight: fontWeight.medium
	},
	slide: {
		width: SCREEN_WIDTH,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: spacing.xl
	},
	iconContainer: {
		marginBottom: spacing.xxl
	},
	iconCircle: {
		width: 200,
		height: 200,
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 8
	},
	title: {
		fontSize: fontSize.xxxl,
		fontWeight: fontWeight.bold,
		color: colors.textPrimary,
		textAlign: 'center',
		marginBottom: spacing.md
	},
	description: {
		fontSize: fontSize.lg,
		color: colors.textSecondary,
		textAlign: 'center',
		lineHeight: 28,
		paddingHorizontal: spacing.lg
	},
	footer: {
		paddingHorizontal: spacing.xl,
		paddingBottom: spacing.xxl
	},
	pagination: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: spacing.xl
	},
	dot: {
		height: 8,
		borderRadius: 4,
		backgroundColor: colors.primary,
		marginHorizontal: 4
	}
});

export default OnboardingScreen;
