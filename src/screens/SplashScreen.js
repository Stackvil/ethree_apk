import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, StatusBar } from 'react-native';
import { MotiView, MotiText } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('screen');

const SplashScreen = ({ onFinish }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onFinish) onFinish();
        }, 4000); // Slightly longer for cinematic effect
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Cinematic Immersive Background */}
            <LinearGradient
                colors={['#020205', '#0A0515', '#000000']}
                style={StyleSheet.absoluteFill}
            />

            {/* Layered Ambient Glows */}
            <MotiView
                from={{ opacity: 0.1, scale: 0.8 }}
                animate={{ opacity: 0.25, scale: 1.2 }}
                transition={{
                    type: 'timing',
                    duration: 4000,
                    loop: true,
                    repeatReverse: true,
                }}
                style={styles.ambientGlowPrimary}
            >
                <LinearGradient
                    colors={['rgba(88, 86, 214, 0.2)', 'transparent']}
                    style={styles.glowCircle}
                />
            </MotiView>

            <MotiView
                from={{ opacity: 0.05, scale: 1.2 }}
                animate={{ opacity: 0.15, scale: 0.8 }}
                transition={{
                    type: 'timing',
                    duration: 5000,
                    loop: true,
                    repeatReverse: true,
                }}
                style={styles.ambientGlowSecondary}
            >
                <LinearGradient
                    colors={['rgba(254, 193, 5, 0.1)', 'transparent']}
                    style={styles.glowCircle}
                />
            </MotiView>

            <View style={styles.content}>
                {/* Hero Logo Reveal */}
                <MotiView
                    from={{
                        opacity: 0,
                        scale: 0.92,
                        translateY: 15,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        translateY: 0,
                    }}
                    transition={{
                        type: 'timing',
                        duration: 1800,
                        delay: 400,
                    }}
                    style={styles.logoWrapper}
                >
                    <Image
                        source={require('../../assets/LOGO.png')}
                        style={styles.logoImage}
                        contentFit="contain"
                        transition={1000}
                    />
                    {/* Inner soft glow for the logo */}
                    <View style={styles.logoInnerGlow} />
                </MotiView>


            </View>

            {/* High-Precision Loading Indicator */}
            <View style={styles.footer}>
                <View style={styles.loadingTrack}>
                    <MotiView
                        from={{ width: 0 }}
                        animate={{ width: 160 }}
                        transition={{
                            type: 'timing',
                            duration: 3200,
                            delay: 600,
                        }}
                        style={styles.progressBar}
                    />
                </View>
                <MotiText
                    from={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ delay: 2800 }}
                    style={styles.footerDetail}
                >
                    EST. 2024 • PREMIUM EXPERIENCE
                </MotiText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ambientGlowPrimary: {
        position: 'absolute',
        width: width * 1.8,
        height: width * 1.8,
        top: -width * 0.4,
    },
    ambientGlowSecondary: {
        position: 'absolute',
        width: width * 1.5,
        height: width * 1.5,
        bottom: -width * 0.3,
    },
    glowCircle: {
        width: '100%',
        height: '100%',
        borderRadius: width * 0.9,
    },
    content: {
        alignItems: 'center',
        zIndex: 10,
    },
    logoWrapper: {
        width: width * 0.7,
        height: 140,
        backgroundColor: 'transparent',
        shadowColor: '#5856D6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 30,
        elevation: 20,
    },
    logoImage: {
        width: '100%',
        height: '100%',
    },
    logoInnerGlow: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
    },


    footer: {
        position: 'absolute',
        bottom: 80,
        alignItems: 'center',
    },
    loadingTrack: {
        width: 160,
        height: 1.5,
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 1,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#FEC105',
        shadowColor: '#FEC105',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    footerDetail: {
        color: '#fff',
        fontSize: 9,
        marginTop: 16,
        letterSpacing: 2,
        fontWeight: '600',
    }
});

export default SplashScreen;
