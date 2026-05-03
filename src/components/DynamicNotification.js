import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, Text, View, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MotiView, AnimatePresence } from 'moti';
import { Info, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const DynamicNotification = forwardRef((props, ref) => {
    const insets = useSafeAreaInsets();
    const [visible, setVisible] = useState(false);
    const [config, setConfig] = useState({
        message: '',
        type: 'info', // info, success, warning, error
        duration: 3000,
    });

    const show = useCallback((message, type = 'info', duration = 3000) => {
        setConfig({ message, type, duration });
        setVisible(true);
    }, []);

    const hide = useCallback(() => {
        setVisible(false);
    }, []);

    useImperativeHandle(ref, () => ({
        show,
        hide
    }));

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, config.duration);
            return () => clearTimeout(timer);
        }
    }, [visible, config.duration]);

    const getIcon = () => {
        const size = 20;
        const color = '#fff';
        switch (config.type) {
            case 'success': return <CheckCircle2 color={color} size={size} />;
            case 'warning': return <AlertTriangle color={color} size={size} />;
            case 'error': return <XCircle color={color} size={size} />;
            default: return <Info color={color} size={size} />;
        }
    };

    return (
        <AnimatePresence>
            {visible && (
                <View style={[styles.overlay, { top: Math.max(insets.top, 20) + (Platform.OS === 'ios' ? 30 : 50) }]} pointerEvents="box-none">
                    <MotiView
                        from={{ opacity: 0, scale: 0.8, translateY: -20 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            translateY: 0,
                            width: width * 0.9,
                        }}
                        exit={{ opacity: 0, scale: 0.8, translateY: -20 }}
                        transition={{
                            type: 'timing',
                            duration: 500,
                        }}
                        style={[styles.island, styles[config.type]]}
                    >
                        <TouchableOpacity
                            style={styles.content}
                            activeOpacity={0.8}
                            onPress={() => {
                                if (props.navigation?.current && (config.type === 'success' || config.message.toLowerCase().includes('cart'))) {
                                    props.navigation.current.navigate('Cart');
                                }
                                setVisible(false);
                            }}
                        >
                            <View style={styles.iconContainer}>
                                {getIcon()}
                            </View>
                            <Text style={styles.message} numberOfLines={2}>
                                {config.message}
                            </Text>
                        </TouchableOpacity>
                    </MotiView>
                </View>
            )}
        </AnimatePresence>
    );
});

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 9999,
    },
    island: {
        backgroundColor: '#000',
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        marginRight: 12,
    },
    message: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
    },
    info: { backgroundColor: '#000' },
    success: { backgroundColor: '#10B981' }, // Emerald 500
    warning: { backgroundColor: '#F59E0B' }, // Amber 500
    error: { backgroundColor: '#EF4444' }, // Red 500
});

export default DynamicNotification;
