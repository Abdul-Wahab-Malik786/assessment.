import React, { useEffect } from 'react';
import { View, Text, StyleSheet, UIManager, findNodeHandle } from 'react-native';

const DropZone = React.forwardRef(({ onReady, droppedCards }, ref) => {
  useEffect(() => {
    setTimeout(() => {
      onReady?.();
    }, 500);
  }, []);

  return (
    <View ref={ref} style={styles.dropZone}>
      {/* <Text style={styles.dropText}>Drop Here</Text> */}
      <View style={styles.cardContainer}>
        {droppedCards.map((card, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardText}>{card}</Text>
          </View>
        ))}
      </View>
    </View>
  );
});

export default DropZone;

const styles = StyleSheet.create({
  dropZone: {
    height: 100,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#73BBD1',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 10,
  },
  dropText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
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
  cardText: {
    fontSize: 24,
    color: 'white',
  },
});
