import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants';

type Props = {
  score: number;
  bestScore: number;
  timeLeft: number;
  arrowsLeft: number;
  combo: number;
  perfectHits: number;
};

export default function Hud({
  score,
  bestScore,
  timeLeft,
  arrowsLeft,
  combo,
  perfectHits,
}: Props) {
  return (
    <View style={styles.grid}>
      <View style={styles.card}>
        <Text style={styles.label}>Score</Text>
        <Text style={styles.value}>{score}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Best</Text>
        <Text style={styles.value}>{bestScore}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Time</Text>
        <Text style={styles.value}>{timeLeft}s</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Arrows</Text>
        <Text style={styles.value}>{arrowsLeft}</Text>
      </View>
      <View style={styles.cardWide}>
        <Text style={styles.label}>Combo</Text>
        <Text style={styles.value}>{combo}</Text>
      </View>
      <View style={styles.cardWide}>
        <Text style={styles.label}>Perfect</Text>
        <Text style={styles.value}>{perfectHits}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  card: {
    width: '23%',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cardWide: {
    width: '48%',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  label: {
    color: COLORS.muted,
    fontSize: 11,
    marginBottom: 4,
  },
  value: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '900',
  },
});