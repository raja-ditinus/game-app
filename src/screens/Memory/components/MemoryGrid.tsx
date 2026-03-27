import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { MemoryCardType } from '../types';
import MemoryCard from './MemoryCard';

type Props = {
  cards: MemoryCardType[];
  columns: number;
  onCardPress: (id: string) => void;
};

export default function MemoryGrid({
  cards,
  columns,
  onCardPress,
}: Props) {
  const { width } = useWindowDimensions();

  const gap = 10;
  const boardHorizontalPadding = 24; // board wrapper + inner spacing
  const itemWidth =
    (width - boardHorizontalPadding - gap * (columns - 1) - 32) / columns;

  return (
    <View style={[styles.grid, { gap }]}>
      {cards.map(card => (
        <View
          key={card.id}
          style={{
            width: itemWidth,
          }}
        >
          <MemoryCard card={card} onPress={() => onCardPress(card.id)} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});