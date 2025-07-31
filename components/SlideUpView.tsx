
import React, { useEffect, useRef } from 'react';
import { Animated, BackHandler, Dimensions, Keyboard, PanResponder, Pressable, ScrollView, StyleSheet, View } from 'react-native';

interface SlideUpViewProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  slideHeight?: number;
}

const { height } = Dimensions.get('window');

const SlideUpView: React.FC<SlideUpViewProps> = ({ isVisible, onClose, children, slideHeight }) => {
  const SLIDE_HEIGHT = slideHeight || height * 0.7;
  const slideAnim = useRef(new Animated.Value(SLIDE_HEIGHT)).current;
  const keyboardOffset = useRef(new Animated.Value(0)).current; // New animated value for keyboard offset
  const [ _isVisible, setIsVisible ] = React.useState(isVisible);
  const animationRunning = useRef(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        Animated.timing(keyboardOffset, {
          toValue: e.endCoordinates.height, // Animate for both iOS and Android
          duration: 250,
          useNativeDriver: true,
        }).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.timing(keyboardOffset, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        slideAnim.setValue(Math.max(0, gestureState.dy));
      },
      onPanResponderRelease: (_, gestureState) => {
        if (animationRunning.current) {
          return;
        }
        if (gestureState.dy > SLIDE_HEIGHT * 0.01) {
          animationRunning.current = true;
          Animated.timing(slideAnim, {
            toValue: SLIDE_HEIGHT,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            animationRunning.current = false;
            setIsVisible(false);
            onClose();
          });
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (isVisible) {
      setIsVisible(true);
      animationRunning.current = true;
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        animationRunning.current = false;
      });
    } else {
      animationRunning.current = true;
      Animated.timing(slideAnim, {
        toValue: SLIDE_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        animationRunning.current = false;
        setIsVisible(false);
      });
    }
  }, [isVisible, slideAnim]);

  // Add back button handler to close slide up view on Android hardware back press
  useEffect(() => {
    if (!_isVisible) return;

    const onBackPress = () => {
      if (animationRunning.current) {
        return true; // Prevent back action if animation is running
      }
      // Default behavior: close the slide up view
      animationRunning.current = true;
      Animated.timing(slideAnim, {
        toValue: SLIDE_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        animationRunning.current = false;
        setIsVisible(false);
        onClose();
      });
      return true; // Prevent default back action
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      if (BackHandler && BackHandler.removeEventListener) {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }
    };
  }, [_isVisible, onClose, slideAnim]);

  return (
    <>
      {_isVisible && (
        <Pressable style={styles(SLIDE_HEIGHT).overlay} onPress={onClose}>
          <Animated.View
            style={[
              styles(SLIDE_HEIGHT).container,
              { transform: [{ translateY: Animated.add(slideAnim, Animated.multiply(keyboardOffset, -1)) }] },
            ]}
          >
            {/* Prevent clicks on the container from propagating to the overlay */}
            <Pressable style={styles(SLIDE_HEIGHT).innerContainer}>
              <View style={styles(SLIDE_HEIGHT).dragHandleArea} {...panResponder.panHandlers}>
                <View style={styles(SLIDE_HEIGHT).dragger} />
              </View>
              {children}
            </Pressable>
          </Animated.View>
        </Pressable>
      )}
    </>
  );
};

const styles = (SLIDE_HEIGHT: number) => StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background for the 20% area
    justifyContent: 'flex-end', // Align container to the bottom
  },
  container: {
     zIndex: 1000,
    height: SLIDE_HEIGHT,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 50,
    overflow: 'hidden', // Ensures content respects border radius
  },
  innerContainer: {
    flex: 1, // Take full height of the container
  },
  dragHandleArea: {
    width: '100%',
    paddingTop: 10,
    alignItems: 'center',
  },
  dragger: {
    width: 50,
    height: 6,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255, 125, 46, 0.1)',
  },
});

export default SlideUpView;
/* Rectangle 4469 */





