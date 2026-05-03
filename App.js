import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SafeAreaContext from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Import Context
import { CartProvider } from './src/context/CartContext';
import { AuthProvider } from './src/context/AuthContext';

// Import Components
import DynamicNotification from './src/components/DynamicNotification';
import CartFloatingBar from './src/components/CartFloatingBar';
import CustomTabBar from './src/components/CustomTabBar';

// Import Screens
import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DiningScreen from './src/screens/DiningScreen';
import RestaurantDetailScreen from './src/screens/RestaurantDetailScreen';
import EventsScreen from './src/screens/EventsScreen';
import VisitScreen from './src/screens/VisitScreen';
import SplashScreen from './src/screens/SplashScreen';
import RideHistoryScreen from './src/screens/RideHistoryScreen';
import PaymentGatewayScreen from './src/screens/PaymentGatewayScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import BookingSuccessScreen from './src/screens/BookingSuccessScreen';
import TicketScreen from './src/screens/TicketScreen';
import PlaceholderScreen from './src/screens/PlaceholderScreen';
import LoginScreen from './src/screens/LoginScreen';
import PaymentsScreen from './src/screens/PaymentsScreen';
import OffersScreen from './src/screens/OffersScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import HelpScreen from './src/screens/HelpScreen';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import TermsOfServiceScreen from './src/screens/TermsOfServiceScreen';
import AboutEthreeScreen from './src/screens/AboutEthreeScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MenuGalleryScreen from './src/screens/MenuGalleryScreen';


import { View, StyleSheet, Dimensions } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const { width } = Dimensions.get('window');

function TabNavigator() {
    return (
        <Tab.Navigator
            tabBar={props => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Dining" component={DiningScreen} />
            <Tab.Screen name="Events" component={EventsScreen} />
            <Tab.Screen name="Visit" component={VisitScreen} />
        </Tab.Navigator>
    );
}

import { notificationRef } from './src/utils/notificationRef';
import { navigationRef } from './src/utils/navigationRef';

export default function App() {
    const [showSplash, setShowSplash] = useState(true);
    const [currentRoute, setCurrentRoute] = useState('Home');

    if (showSplash) {
        return <SplashScreen onFinish={() => setShowSplash(false)} />;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="light" translucent backgroundColor="transparent" />
            <SafeAreaContext.SafeAreaProvider>
                <AuthProvider>
                    <CartProvider>
                        <NavigationContainer
                            ref={navigationRef}
                            onReady={() => {
                                setCurrentRoute(navigationRef.getCurrentRoute().name);
                            }}
                            onStateChange={async () => {
                                const routeName = navigationRef.getCurrentRoute().name;
                                setCurrentRoute(routeName);
                            }}
                        >
                            <Stack.Navigator screenOptions={{ headerShown: false }}>
                                <Stack.Screen name="MainTabs" component={TabNavigator} />
                                <Stack.Screen name="Cart" component={CartScreen} />
                                <Stack.Screen name="Profile" component={ProfileScreen} />
                                <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} />
                                <Stack.Screen name="RideHistory" component={RideHistoryScreen} />
                                <Stack.Screen name="PaymentGateway" component={PaymentGatewayScreen} />
                                <Stack.Screen name="Payment" component={PaymentScreen} />
                                <Stack.Screen name="BookingSuccess" component={BookingSuccessScreen} options={{ gestureEnabled: false }} />
                                <Stack.Screen name="TicketScreen" component={TicketScreen} />
                                <Stack.Screen name="Placeholder" component={PlaceholderScreen} />
                                <Stack.Screen name="Login" component={LoginScreen} />
                                <Stack.Screen name="Payments" component={PaymentsScreen} />
                                <Stack.Screen name="Offers" component={OffersScreen} />
                                <Stack.Screen name="Settings" component={SettingsScreen} />
                                <Stack.Screen name="Help" component={HelpScreen} />
                                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
                                <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
                                <Stack.Screen name="AboutEthree" component={AboutEthreeScreen} />
                                <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                                <Stack.Screen name="Register" component={RegisterScreen} />
                                <Stack.Screen name="MenuGallery" component={MenuGalleryScreen} />

                            </Stack.Navigator>
                        </NavigationContainer>
                        <CartFloatingBar currentRoute={currentRoute} />
                        <DynamicNotification ref={notificationRef} navigation={navigationRef} />
                    </CartProvider>
                </AuthProvider>
            </SafeAreaContext.SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    tabBarContainer: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 100,
    },
    tabBarBlur: {
        borderRadius: 35,
        overflow: 'hidden',
        width: width * 0.85,
        height: 70,
    },
    tabBar: {
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Fallback / Overlay
    },
    tabItem: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
    },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeIconWrapper: {
        backgroundColor: '#fff',
    }
});
