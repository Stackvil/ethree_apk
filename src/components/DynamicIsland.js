import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { Mic, Bell } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const DynamicIsland = ({ state = 'idle', message = '' }) => {
    // state: 'idle', 'voice', 'notification'

    const getDimensions = () => {
        switch (state) {
            case 'voice':
                return { width: width * 0.8, height: 60, borderRadius: 30 };
            case 'notification':
                return { width: width * 0.9, height: 80, borderRadius: 40 };
            default: // idle
                return { width: 120, height: 35, borderRadius: 20 };
        }
    };

    return (
        <View style={styles.container}>
            <MotiView
                from={{ width: 120, height: 35, borderRadius: 20 }}
                animate={getDimensions()}
                transition={{ type: 'spring', damping: 15 }}
                style={styles.island}
            >
                {state === 'idle' && (
                    <View style={styles.idleContent} />
                )}

                {state === 'voice' && (
                    <MotiView
                        from={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={styles.contentRow}
                    >
                        <MotiView
                            from={{ scale: 1 }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ loop: true, duration: 1000 }}
                        >
                            <Mic color="#FF4081" size={24} />
                        </MotiView>
                        <Text style={styles.text}>Listening...</Text>
                    </MotiView>
                )}

                {state === 'notification' && (
                    <MotiView
                        from={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={styles.contentRow}
                    >
                        <Bell color="#FEC105" size={24} />
                        <View style={styles.textColumn}>
                            <Text style={styles.title}>Notification</Text>
                            <Text style={styles.text}>{message}</Text>
                        </View>
                    </MotiView>
                )}
            </MotiView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10, // Adjust based on device safe area
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 9999,
    },
    island: {
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    idleContent: {
        width: '100%',
        height: '100%',
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    textColumn: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 10,
    },
    title: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 10,
        textTransform: 'uppercase',
    }
});

export default DynamicIsland;
