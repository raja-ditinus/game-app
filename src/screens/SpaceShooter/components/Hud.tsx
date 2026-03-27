import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants';

type Props = {
  score: number;
  bestScore: number;
  lives: number;
};

export default function Hud({ score, bestScore, lives }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.card}>
        <Text style={styles.label}>Score</Text>
        <Text style={styles.value}>{score}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Best</Text>
        <Text style={styles.value}>{bestScore}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Lives</Text>
        <Text style={styles.value}>{lives}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  card: {
    flex: 1,
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