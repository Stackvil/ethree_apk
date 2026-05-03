import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity, 
    FlatList, 
    Dimensions, 
    StatusBar,
    Platform
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, X, ChevronRight } from 'lucide-react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withSpring,
    withTiming,
    withDecay,
    runOnJS,
    cancelAnimation
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const MIN_SCALE = 1;
const MAX_SCALE = 6;
const DOUBLE_TAP_SCALE = 3;

// High-performance ZoomableImage component from the gallery app
const ZoomableImage = ({ 
  source, 
  onZoomChange, 
  isActive = true,
  onPress
}) => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const savedScale = useSharedValue(1);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const isDoubleTapping = useSharedValue(0);
  const containerWidth = useSharedValue(SCREEN_WIDTH);
  const containerHeight = useSharedValue(SCREEN_HEIGHT);

  const imageWidth = useSharedValue(0);
  const imageHeight = useSharedValue(0);

  const [hasError, setHasError] = useState(false);

  const setIsZoomed = useCallback((zoomed) => {
    if (onZoomChange) {
      onZoomChange(zoomed);
    }
  }, [onZoomChange]);

  const resetZoomUI = () => {
    'worklet';
    cancelAnimation(scale);
    cancelAnimation(translateX);
    cancelAnimation(translateY);
    scale.value = withTiming(1, { duration: 200 });
    translateX.value = withTiming(0, { duration: 200 });
    translateY.value = withTiming(0, { duration: 200 });
    savedScale.value = 1;
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
    isDoubleTapping.value = 0;
    runOnJS(setIsZoomed)(false);
  };

  const clamp = (value, lower, upper) => {
    'worklet';
    return Math.min(Math.max(value, lower), upper);
  };

  const getDisplayedDimensions = () => {
    'worklet';
    const containerW = containerWidth.value;
    const containerH = containerHeight.value;
    const imgW = imageWidth.value;
    const imgH = imageHeight.value;

    if (imgW === 0 || imgH === 0) {
      return { displayedWidth: containerW, displayedHeight: containerH };
    }

    const wRatio = containerW / imgW;
    const hRatio = containerH / imgH;
    const scaleFactor = Math.min(1, Math.min(wRatio, hRatio));

    return {
      displayedWidth: imgW * scaleFactor,
      displayedHeight: imgH * scaleFactor
    };
  };

  const getBounds = (currentScale) => {
    'worklet';
    const { displayedWidth, displayedHeight } = getDisplayedDimensions();
    const zoomedWidth = displayedWidth * currentScale;
    const zoomedHeight = displayedHeight * currentScale;

    const maxTranslateX = Math.max(0, (zoomedWidth - containerWidth.value) / 2);
    const maxTranslateY = Math.max(0, (zoomedHeight - containerHeight.value) / 2);

    return { maxTranslateX, maxTranslateY };
  };

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .maxDuration(250)
    .onEnd((e) => {
      'worklet';
      isDoubleTapping.value = 1;
      cancelAnimation(translateX);
      cancelAnimation(translateY);
      cancelAnimation(scale);

      if (scale.value > 1.05) {
        scale.value = withTiming(1, { duration: 300 }, () => {
          isDoubleTapping.value = 0;
        });
        translateX.value = withTiming(0, { duration: 300 });
        translateY.value = withTiming(0, { duration: 300 });
        savedScale.value = 1;
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
        runOnJS(setIsZoomed)(false);
      } else {
        const targetScale = DOUBLE_TAP_SCALE;
        const cx = containerWidth.value / 2;
        const cy = containerHeight.value / 2;

        let targetX = (cx - e.x) * (targetScale - 1);
        let targetY = (cy - e.y) * (targetScale - 1);

        const { maxTranslateX, maxTranslateY } = getBounds(targetScale);
        targetX = clamp(targetX, -maxTranslateX, maxTranslateX);
        targetY = clamp(targetY, -maxTranslateY, maxTranslateY);

        scale.value = withTiming(targetScale, { duration: 300 }, () => {
          isDoubleTapping.value = 0;
        });
        translateX.value = withTiming(targetX, { duration: 300 });
        translateY.value = withTiming(targetY, { duration: 300 });

        savedScale.value = targetScale;
        savedTranslateX.value = targetX;
        savedTranslateY.value = targetY;
        runOnJS(setIsZoomed)(true);
      }
    });

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      'worklet';
      cancelAnimation(scale);
      cancelAnimation(translateX);
      cancelAnimation(translateY);
      savedScale.value = scale.value;
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
      runOnJS(setIsZoomed)(true);
    })
    .onUpdate((e) => {
      'worklet';
      const newScale = clamp(savedScale.value * e.scale, MIN_SCALE, MAX_SCALE);
      scale.value = newScale;
    })
    .onEnd(() => {
      'worklet';
      if (scale.value <= 1.01) {
        resetZoomUI();
      } else {
        const finalScale = Math.min(scale.value, MAX_SCALE);
        const { maxTranslateX, maxTranslateY } = getBounds(finalScale);
        const finalTranslateX = clamp(translateX.value, -maxTranslateX, maxTranslateX);
        const finalTranslateY = clamp(translateY.value, -maxTranslateY, maxTranslateY);

        scale.value = withTiming(finalScale);
        translateX.value = withTiming(finalTranslateX);
        translateY.value = withTiming(finalTranslateY);

        savedScale.value = finalScale;
        savedTranslateX.value = finalTranslateX;
        savedTranslateY.value = finalTranslateY;
        runOnJS(setIsZoomed)(true);
      }
    });

  const panGesture = Gesture.Pan()
    .manualActivation(true)
    .averageTouches(true)
    .onTouchesDown((e, state) => {
      'worklet';
      if (scale.value <= 1.01) {
        state.fail();
      }
    })
    .onTouchesMove((e, state) => {
      'worklet';
      if (isDoubleTapping.value === 1) {
        state.fail();
        return;
      }
      if (scale.value > 1.01) {
        state.activate();
      }
    })
    .onStart(() => {
      'worklet';
      cancelAnimation(translateX);
      cancelAnimation(translateY);
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate((e) => {
      'worklet';
      if (isDoubleTapping.value === 1) return;

      let nextX = savedTranslateX.value + e.translationX;
      let nextY = savedTranslateY.value + e.translationY;

      const { maxTranslateX, maxTranslateY } = getBounds(scale.value);
      nextX = clamp(nextX, -maxTranslateX, maxTranslateX);
      nextY = clamp(nextY, -maxTranslateY, maxTranslateY);

      translateX.value = nextX;
      translateY.value = nextY;
    })
    .onEnd((e) => {
      'worklet';
      if (isDoubleTapping.value === 1 || scale.value <= 1.01) {
        if (scale.value <= 1.01) resetZoomUI();
        return;
      }

      const { maxTranslateX, maxTranslateY } = getBounds(scale.value);
      translateX.value = withDecay({
        velocity: e.velocityX,
        clamp: [-maxTranslateX, maxTranslateX],
      });
      translateY.value = withDecay({
        velocity: e.velocityY,
        clamp: [-maxTranslateY, maxTranslateY],
      });
    });

  const singleTapGesture = Gesture.Tap()
    .numberOfTaps(1)
    .maxDuration(250)
    .onStart(() => {
      'worklet';
      if (onPress) {
        runOnJS(onPress)();
      }
    });

  const exclusiveSingleTap = Gesture.Exclusive(doubleTapGesture, singleTapGesture);
  const finalGesture = Gesture.Simultaneous(exclusiveSingleTap, pinchGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => {
    const { displayedWidth, displayedHeight } = getDisplayedDimensions();
    return {
      width: displayedWidth,
      height: displayedHeight,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  return (
    <View
      style={styles.zoomContainer}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        containerWidth.value = width;
        containerHeight.value = height;
      }}
    >
      <GestureDetector gesture={finalGesture}>
        <View style={styles.gestureContainer}>
          <Animated.View style={animatedStyle}>
            <Image
              source={source}
              style={{ width: '100%', height: '100%' }}
              contentFit="contain"
              transition={200}
              cachePolicy="disk"
              onLoad={(e) => {
                const { width, height } = e.source;
                imageWidth.value = width;
                imageHeight.value = height;
              }}
              onError={() => setHasError(true)}
            />
          </Animated.View>
        </View>
      </GestureDetector>
    </View>
  );
};

const MenuGalleryScreen = ({ route, navigation }) => {
    const insets = useSafeAreaInsets();
    const { restaurant } = route?.params || {};
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const flatListRef = useRef(null);

    // Reset zoom state when changing pages
    useEffect(() => {
        setIsZoomed(false);
    }, [currentIndex]);


    // Prefetch all images for this restaurant immediately
    useEffect(() => {
        if (restaurant?.menuImages) {
            const urls = restaurant.menuImages
                .filter(img => typeof img === 'string')
                .map(img => img);
            if (urls.length > 0) {
                Image.prefetch(urls);
            }
        }
    }, [restaurant]);

    if (!restaurant || !restaurant.menuImages || restaurant.menuImages.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>No menu images available.</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backBtnText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const scrollToIndex = (index) => {
        if (index >= 0 && index < restaurant.menuImages.length) {
            flatListRef.current?.scrollToIndex({ index, animated: true });
            setCurrentIndex(index);
        }
    };

    const renderItem = ({ item }) => (
        <ZoomableImage 
            source={typeof item === 'string' ? { uri: item } : item} 
            onZoomChange={setIsZoomed}
        />
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                
                {/* Header */}
                {!isZoomed && (
                    <View style={[styles.header, { paddingTop: insets.top }]}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navBtn}>
                            <ChevronLeft size={28} color="#fff" />
                        </TouchableOpacity>
                        <View style={styles.headerTitleContainer}>
                            <Text style={styles.restaurantName} numberOfLines={1}>{restaurant.name}</Text>
                            <Text style={styles.headerSubtitle}>Digital Menu</Text>
                        </View>
                        <View style={styles.navBtn} />
                    </View>
                )}

                <View style={styles.sliderContainer}>
                    <FlatList
                        ref={flatListRef}
                        data={restaurant.menuImages}
                        renderItem={renderItem}
                        keyExtractor={(_, index) => index.toString()}
                        horizontal
                        pagingEnabled
                        scrollEnabled={!isZoomed}
                        showsHorizontalScrollIndicator={false}
                        removeClippedSubviews={false} // Prevent aggressive unmounting
                        initialNumToRender={restaurant.menuImages.length} // Render all for stability
                        windowSize={5} // Keep more items in memory
                        onMomentumScrollEnd={(event) => {
                            const newIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
                            setCurrentIndex(newIndex);
                        }}
                        getItemLayout={(_, index) => ({
                            length: SCREEN_WIDTH,
                            offset: SCREEN_WIDTH * index,
                            index,
                        })}
                    />


                    {/* Navigation Arrows (Only show if not zoomed) */}
                    {!isZoomed && (
                        <>
                            {currentIndex > 0 && (
                                <TouchableOpacity 
                                    style={[styles.arrowBtn, styles.leftArrow]}
                                    onPress={() => scrollToIndex(currentIndex - 1)}
                                >
                                    <ChevronLeft size={32} color="#fff" />
                                </TouchableOpacity>
                            )}

                            {currentIndex < restaurant.menuImages.length - 1 && (
                                <TouchableOpacity 
                                    style={[styles.arrowBtn, styles.rightArrow]}
                                    onPress={() => scrollToIndex(currentIndex + 1)}
                                >
                                    <ChevronRight size={32} color="#fff" />
                                </TouchableOpacity>
                            )}
                        </>
                    )}
                </View>

                {/* Page Indicator (Only show if not zoomed) */}
                {!isZoomed && (
                    <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
                        <View style={styles.pageIndicator}>
                            <Text style={styles.pageText}>{currentIndex + 1} / {restaurant.menuImages.length}</Text>
                        </View>
                    </View>
                )}
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    zoomContainer: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    gestureContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 40,
    },
    errorText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    backBtn: {
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 25,
    },
    backBtnText: {
        color: '#000',
        fontWeight: '700',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 15,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    navBtn: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    restaurantName: {
        fontSize: 18,
        fontWeight: '800',
        color: '#fff',
    },
    headerSubtitle: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.6)',
        fontWeight: '600',
    },
    sliderContainer: {
        flex: 1,
    },
    arrowBtn: {
        position: 'absolute',
        top: '50%',
        marginTop: -30,
        width: 50,
        height: 50,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    leftArrow: {
        left: 10,
    },
    rightArrow: {
        right: 10,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageIndicator: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    pageText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: 2,
    },
});

export default MenuGalleryScreen;
