import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, UIManager, findNodeHandle } from 'react-native';
import Cards from './Cards';
import DropZone from './DropZone';
import { LinearGradient } from 'expo-linear-gradient';

const GameBoard = () => {
  const [dropZoneLayout, setDropZoneLayout] = useState(null);
  const [droppedCards, setDroppedCards] = useState([]);
  const [handCards, setHandCards] = useState(
    [1, 2, 3, 4, 5, 6].map((n) => n.toString())
  );

  const dropZoneRef = useRef(null);

  const measureDropZone = () => {
    if (dropZoneRef.current) {
      const handle = findNodeHandle(dropZoneRef.current);
      if (handle) {
        UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
          const layout = { x, y, width, height, pageX, pageY };
          setDropZoneLayout(layout);
        });
      }
    }
  };

  const handleDrop = (cardLabel) => {
    if (!droppedCards.includes(cardLabel)) {
      setDroppedCards((prev) => [...prev, cardLabel]);
      setHandCards((prev) => prev.filter((c) => c !== cardLabel));
    }
  };

  return (
    <LinearGradient
      colors={['#111111', '#FFFFFF']}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <DropZone
        ref={dropZoneRef}
        onReady={measureDropZone}
        droppedCards={droppedCards}
        layout={dropZoneLayout}
      />


      <View style={styles.hand}>
        {handCards.map((card, index) => (
          <Cards
            key={index}
            label={card}
            dropZoneLayout={dropZoneLayout}
            onDrop={handleDrop}
          />
        ))}
      </View>
    </LinearGradient>
  );
};

export default GameBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: 20,
    paddingTop: 190,
    paddingBottom: 100,
    justifyContent: 'space-between',
  },
  hand: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});
