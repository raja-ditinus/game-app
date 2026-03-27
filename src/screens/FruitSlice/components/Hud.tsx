import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { THEME } from '../constants';

type Props = {
  score: number;
  combo: number;
  lives: number;
};

export default function Hud({ score, combo, lives }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.card}>
        <Text style={styles.label}>Score</Text>
        <Text style={styles.value}>{score}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Combo</Text>
        <Text style={styles.value}>{combo}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Lives</Text>
        <Text style={styles.value}>{'❤️'.repeat(lives)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: THEME.card,
    borderWidth: 1,
    borderColor: THEME.border,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  label: {
    color: THEME.muted,
    fontSize: 11,
    marginBottom: 4,
  },
  value: {
    color: THEME.text,
    fontWeight: '900',
    fontSize: 18,
  },
});