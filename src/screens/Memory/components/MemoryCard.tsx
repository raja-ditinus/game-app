import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { MEMORY_THEME } from '../constants';
import { MemoryCardType } from '../types';

type Props = {
  card: MemoryCardType;
  onPress: () => void;
};

export default function MemoryCard({ card, onPress }: Props) {
  const visible = card.isFlipped || card.isMatched;

  return (
    <Pressable
      style={[
        styles.card,
        visible && styles.cardFront,
        card.isMatched && styles.cardMatched,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, !visible && styles.hiddenText]}>
        {visible ? card.value : '?'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 18,
    backgroundColor: MEMORY_THEME.cardBack,
    borderWidth: 1,
    borderColor: MEMORY_THEME.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 72,
  },
  cardFront: {
    backgroundColor: MEMORY_THEME.cardFront,
  },
  cardMatched: {
    backgroundColor: MEMORY_THEME.cardMatched,
  },
  text: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },
  hiddenText: {
    color: MEMORY_THEME.accent,
    fontSize: 24,
  },
});