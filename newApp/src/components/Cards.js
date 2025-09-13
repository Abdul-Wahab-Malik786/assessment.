import React from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const Cards = ({ label, dropZoneLayout, onDrop }) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      const cardCenterX = x.value + 25;
      const cardCenterY = y.value + 35;

      const inDropZone =
        dropZoneLayout &&
        cardCenterX >= dropZoneLayout.pageX &&
        cardCenterX <= dropZoneLayout.pageX + dropZoneLayout.width &&
        cardCenterY >= dropZoneLayout.pageY &&
        cardCenterY <= dropZoneLayout.pageY + dropZoneLayout.height;

      // const movedEnough = Math.abs(event.translationY) > 20;

      if (dropZoneLayout ) {
        runOnJS(onDrop)?.(label);
        x.value = withSpring(0);
        y.value = withSpring(0);
      }
    },
  });

  const handlePress = () => {
    if (!dropZoneLayout) return;
  
    // Calculate how far the card needs to move
    const targetX = dropZoneLayout.pageX + 25; // center inside dropZone
    const targetY = dropZoneLayout.pageY + 35;
  
    // Animate to that location
    x.value = withSpring(targetX, { damping: 5, stiffness: 120 });
    y.value = withSpring(targetY, { damping: 5, stiffness: 120 });
  
    // After animation completes, trigger drop logic
    setTimeout(() => {
      runOnJS(onDrop)(label);
    }, 300); // match animation duration
  };
  
  

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
    <Animated.View style={[styles.card, animatedStyle]}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <Text style={styles.text}>{label}</Text>
      </TouchableWithoutFeedback>
    </Animated.View>
  </PanGestureHandler>
  );
};

export default Cards;

const styles = StyleSheet.create({
  card: {
    width: 50,
    height: 70,
    backgroundColor: '#c62828',
    borderRadius: 6,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
});
