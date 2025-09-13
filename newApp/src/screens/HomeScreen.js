import React from 'react';
import { StyleSheet } from 'react-native';
import GameBoard from '../components/GameBoard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const HomeScreen = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GameBoard />
    </GestureHandlerRootView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

// import React, { useRef, useState } from 'react';
// import {
//     View, StyleSheet, PanResponder, Animated,
//     Text
// } from 'react-native';

// const DragAndDropCard = ({ heading, paragraph }) => {

//     // Create a ref to store the position of the card
//     const position =
//         useRef(new Animated.ValueXY()).current;

//     // State to track if the card is being dragged
//     const [dragging, setDragging] = useState(false);

//     // Create a pan responder to handle touch events
//     const panResponder = useRef(
//         PanResponder.create({
//             onStartShouldSetPanResponder: () => true,
//             onMoveShouldSetPanResponder: () => true,
//             onPanResponderGrant: () => {

//                 // When touch gesture starts, 
//                 //set dragging to true
//                 setDragging(true);
//             },
//             onPanResponderMove: Animated.event(
//                 [
//                     null,
//                     {
//                         dx: position.x,
//                         dy: position.y,
//                     },
//                 ],
//                 { useNativeDriver: false }
//             ),
//             onPanResponderRelease: () => {
                
//                 // When touch gesture is released, 
//                 //set dragging to false
//                 setDragging(false);
//             },
//         })
//     ).current;

//     return (
//         <Animated.View
//             style={[
//                 styles.card,
//                 {
//                     transform: position.getTranslateTransform(),
//                     opacity: dragging ? 0.8 : 1,
//                 },
//             ]}
//             {...panResponder.panHandlers}
//         >
//             <Text style={styles.heading}>{heading}</Text>
//             <Text style={styles.paragraph}>{paragraph}</Text>
//         </Animated.View>
//     );
// };

// const App = () => {
//     return (
//         <View style={styles.container}>
//             <View style={styles.cardContainer}>
//                 <DragAndDropCard
//                     heading="Geeksforgeeks!"
//                     paragraph="A Computer Science portal for geeks.
//                                It contains well written, well thought 
//                                and well explained computer science and 
//                                 programming articles,"
//                 />
//                 <DragAndDropCard
//                     heading="Geeksforgeeks!!"
//                     paragraph="A Computer Science portal for geeks. 
//                                It contains well written, well thought 
//                                and well explained computer science and 
//                                programming articles,"
//                 />
//                 <DragAndDropCard
//                     heading="Geeksforgeeks!!!"
//                     paragraph="A Computer Science portal for geeks. 
//                               It contains well written, well thought 
//                               and well explained computer science and 
//                               programming articles,"
//                 />
//             </View>
//         </View>
//     );
// };
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5F5F5',
//     },
//     cardContainer: {
//         marginTop: 20,
//     },
//     card: {
//         width: '90%',
//         height: 100,
//         backgroundColor: '#FFF',
//         justifyContent: 'center',
//         alignItems: 'flex-start',
//         paddingHorizontal: 16,
//         paddingVertical: 10,
//         borderRadius: 10,
//         marginBottom: 10,
//         elevation: 5,
//     },
//     heading: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         color: "green",
//         marginBottom: 6,
//     },
//     paragraph: {
//         fontSize: 14,
//     },
// });
// export default App;
