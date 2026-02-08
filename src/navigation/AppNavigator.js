import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from '@react-native-vector-icons/feather';
import { useSelector } from 'react-redux';
import { colors } from '../theme';

// Auth Screens
import SplashScreen from '../screens/auth/SplashScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import RoleSelectionScreen from '../screens/auth/RoleSelectionScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Hospital Screens
import HospitalDashboardScreen from '../screens/hospital/dashboard/HospitalDashboardScreen';

// Professional Screens
import ProfessionalDashboardScreen from '../screens/professional/dashboard/ProfessionalDashboardScreen';

// Shared Screens
import JobDetailScreen from '../screens/shared/JobDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HospitalTabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Dashboard') {
						iconName = 'home';
					} else if (route.name === 'Jobs') {
						iconName = 'briefcase';
					} else if (route.name === 'Applications') {
						iconName = 'file-text';
					} else if (route.name === 'Messages') {
						iconName = 'message-circle';
					} else if (route.name === 'Profile') {
						iconName = 'user';
					}

					return <Feather name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: colors.primary,
				tabBarInactiveTintColor: colors.textLight,
				tabBarStyle: {
					backgroundColor: colors.surface,
					borderTopWidth: 1,
					borderTopColor: colors.borderLight,
					paddingBottom: 8,
					paddingTop: 8,
					height: 60
				},
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: '600'
				},
				headerShown: false
			})}
		>
			<Tab.Screen name="Dashboard" component={HospitalDashboardScreen} />
			<Tab.Screen name="Jobs" component={HospitalDashboardScreen} />
			<Tab.Screen name="Applications" component={HospitalDashboardScreen} />
			<Tab.Screen name="Messages" component={HospitalDashboardScreen} />
			<Tab.Screen name="Profile" component={HospitalDashboardScreen} />
		</Tab.Navigator>
	);
};

const ProfessionalTabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Home') {
						iconName = 'home';
					} else if (route.name === 'Search') {
						iconName = 'search';
					} else if (route.name === 'Saved') {
						iconName = 'heart';
					} else if (route.name === 'Applications') {
						iconName = 'file-text';
					} else if (route.name === 'Profile') {
						iconName = 'user';
					}

					return <Feather name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: colors.primary,
				tabBarInactiveTintColor: colors.textLight,
				tabBarStyle: {
					backgroundColor: colors.surface,
					borderTopWidth: 1,
					borderTopColor: colors.borderLight,
					paddingBottom: 8,
					paddingTop: 8,
					height: 60
				},
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: '600'
				},
				headerShown: false
			})}
		>
			<Tab.Screen name="Home" component={ProfessionalDashboardScreen} />
			<Tab.Screen name="Search" component={ProfessionalDashboardScreen} />
			<Tab.Screen name="Saved" component={ProfessionalDashboardScreen} />
			<Tab.Screen name="Applications" component={ProfessionalDashboardScreen} />
			<Tab.Screen name="Profile" component={ProfessionalDashboardScreen} />
		</Tab.Navigator>
	);
};

const AppNavigator = () => {
	const { isAuthenticated, userRole } = useSelector(state => state.auth);

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					cardStyleInterpolator: ({ current: { progress } }) => ({
						cardStyle: {
							opacity: progress
						}
					})
				}}
			>
				{!isAuthenticated ? (
					<>
						<Stack.Screen name="Splash" component={SplashScreen} />
						<Stack.Screen name="Onboarding" component={OnboardingScreen} />
						<Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
						<Stack.Screen name="Login" component={LoginScreen} />
						<Stack.Screen name="Register" component={RegisterScreen} />
					</>
				) : (
					<>
						<Stack.Screen
							name="Main"
							component={userRole === 'hospital' ? HospitalTabNavigator : ProfessionalTabNavigator}
						/>
						<Stack.Screen
							name="JobDetail"
							component={JobDetailScreen}
							options={{
								headerShown: true,
								headerTitle: 'Job Details',
								headerStyle: {
									backgroundColor: colors.surface
								},
								headerTintColor: colors.textPrimary,
								headerTitleStyle: {
									fontWeight: '700'
								}
							}}
						/>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;
