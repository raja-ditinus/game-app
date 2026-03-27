import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants';

type Props = {
  score: number;
  lives: number;
  level: number;
  bestScore: number;
};

export default function Hud({ score, lives, level, bestScore }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.card}>
        <Text style={styles.label}>Score</Text>
        <Text style={styles.value}>{score}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Lives</Text>
        <Text style={styles.value}>{lives}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Level</Text>
        <Text style={styles.value}>{level}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Best</Text>
        <Text style={styles.value}>{bestScore}</Text>
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
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.panelBorder,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  label: {
    color: COLORS.muted,
    fontSize: 11,
    marginBottom: 4,
  },
  value: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '900',
  },
});