import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { DndProvider, useDrag, useDrop } from '@mgcrea/react-native-dnd';

const { width } = Dimensions.get('window');

// Draggable Card Component
const DraggableCard = ({ label, id }) => {
  const { dragRef, isDragging } = useDrag({
    type: 'CARD',
    payload: { id, label },
  });

  return (
    <View
      ref={dragRef}
      style={[
        styles.card,
        { opacity: isDragging ? 0.5 : 1 },
      ]}
    >
      <Text style={styles.cardText}>{label}</Text>
    </View>
  );
};

// Drop Zone Component
const DropZone = ({ onDrop, droppedItems }) => {
  const { dropRef, isOver } = useDrop({
    type: 'CARD',
    onDrop: (data) => {
      onDrop(data);
    },
  });

  return (
    <View
      ref={dropRef}
      style={[
        styles.dropZone,
        { backgroundColor: isOver ? '#d1f7c4' : '#eee' },
      ]}
    >
      <Text style={styles.dropText}>Drop here</Text>
      {droppedItems.map((item, index) => (
        <Text key={index} style={styles.droppedItem}>{item.label}</Text>
      ))}
    </View>
  );
};

// Main Screen
const MainScreen = () => {
  const [dropped, setDropped] = useState([]);

  const handleDrop = (item) => {
    setDropped((prev) => [...prev, item]);
  };

  return (
    <DndProvider>
      <View style={styles.container}>
        <Text style={styles.header}>Drag the cards into the drop zone</Text>

        <View style={styles.cardsContainer}>
          <DraggableCard label="Card 1" id="1" />
          <DraggableCard label="Card 2" id="2" />
          <DraggableCard label="Card 3" id="3" />
        </View>

        <DropZone onDrop={handleDrop} droppedItems={dropped} />
      </View>
    </DndProvider>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width - 40,
    marginBottom: 40,
  },
  card: {
    width: 80,
    height: 80,
    backgroundColor: '#87cefa',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 3,
  },
  cardText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dropZone: {
    width: width - 80,
    height: 200,
    borderWidth: 2,
    borderColor: '#aaa',
    borderRadius: 15,
    alignItems: 'center',
    padding: 10,
  },
  dropText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  droppedItem: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
});
