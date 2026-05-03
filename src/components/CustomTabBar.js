import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';
import { Home, UtensilsCrossed, Calendar, PhoneCall, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

// Configuration for consistent layout
const BAR_HEIGHT = 70;
const INDICATOR_SIZE = 50;
const PADDING_HORIZONTAL = 12;

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const insets = useSafeAreaInsets();

    const BAR_WIDTH = width * 0.9;
    const TAB_WIDTH = (BAR_WIDTH - (PADDING_HORIZONTAL * 2)) / state.routes.length;

    const indicatorPosition = useSharedValue(0);

    useEffect(() => {
        indicatorPosition.value = withSpring(state.index * TAB_WIDTH, {
            damping: 20,
            stiffness: 150,
            mass: 0.8,
            overshootClamping: false,
        });
    }, [state.index, TAB_WIDTH]);

    const indicatorStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: indicatorPosition.value }],
        };
    });

    return (
        <View style={[styles.container, { bottom: Math.max(insets.bottom, 20) }]}>
            <View style={styles.outerShadow}>
                <BlurView
                    intensity={90}
                    tint="dark"
                    style={styles.blurContainer}
                >
                    {/* Glowing Active Background - Absolutely positioned relative to blurContainer */}
                    <Animated.View style={[styles.indicatorContainer, { width: TAB_WIDTH }, indicatorStyle]}>
                        <View style={styles.indicator} />
                    </Animated.View>

                    {/* Tab Items Container - Fills the blurContainer */}
                    <View style={styles.tabsContainer}>
                        {state.routes.map((route, index) => {
                            const { options } = descriptors[route.key];
                            const isFocused = state.index === index;

                            const onPress = () => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                const event = navigation.emit({
                                    type: 'tabPress',
                                    target: route.key,
                                    canPreventDefault: true,
                                });

                                if (!isFocused && !event.defaultPrevented) {
                                    navigation.navigate(route.name);
                                }
                            };

                            let IconComponent;
                            if (route.name === 'Home') IconComponent = Home;
                            else if (route.name === 'Dining') IconComponent = UtensilsCrossed;
                            else if (route.name === 'Events') IconComponent = Calendar;
                            else if (route.name === 'Visit') IconComponent = PhoneCall;
                            else if (route.name === 'Profile') IconComponent = User;

                            if (!IconComponent) return null;

                            return (
                                <TouchableOpacity
                                    key={index}
                                    accessibilityRole="button"
                                    accessibilityState={isFocused ? { selected: true } : {}}
                                    activeOpacity={0.8}
                                    onPress={onPress}
                                    style={styles.tabItem}
                                >
                                    <MotiView
                                        animate={{
                                            scale: isFocused ? 1.15 : 1,
                                            translateY: isFocused ? -2 : 0, // Reduced lift for better centering
                                        }}
                                        transition={{ type: 'spring', stiffness: 250, damping: 15, mass: 0.8 }}
                                        style={styles.iconContainer}
                                    >
                                        <IconComponent
                                            color={isFocused ? '#FEC105' : 'rgba(255,255,255,0.6)'}
                                            size={22}
                                            strokeWidth={isFocused ? 2.5 : 2}
                                        />

                                        {/* Floating Dot for active state */}
                                        {isFocused && (
                                            <MotiView
                                                from={{ opacity: 0, scale: 0, translateY: 10 }}
                                                animate={{ opacity: 1, scale: 1, translateY: 0 }}
                                                exit={{ opacity: 0, scale: 0 }}
                                                transition={{ type: 'spring', delay: 100 }}
                                                style={styles.activeDot}
                                            />
                                        )}
                                    </MotiView>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </BlurView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1000,
    },
    outerShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    blurContainer: {
        width: width * 0.9,
        height: BAR_HEIGHT,
        borderRadius: BAR_HEIGHT / 2,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
    },
    tabsContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: PADDING_HORIZONTAL,
    },
    indicatorContainer: {
        position: 'absolute',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        left: PADDING_HORIZONTAL, // Start at padding offset
        zIndex: 0,
    },
    indicator: {
        width: INDICATOR_SIZE,
        height: INDICATOR_SIZE,
        borderRadius: INDICATOR_SIZE / 2,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        borderWidth: 1,
        borderColor: 'rgba(254, 193, 5, 0.4)',
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: INDICATOR_SIZE,
        width: INDICATOR_SIZE,
    },
    activeDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#FEC105',
        position: 'absolute',
        bottom: -2,
        shadowColor: '#FEC105',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    }
});

export default CustomTabBar;
