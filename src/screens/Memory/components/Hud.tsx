import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MEMORY_THEME } from '../constants';

type Props = {
  score: number;
  moves: number;
  time: number;
  levelLabel: string;
};

export default function Hud({ score, moves, time, levelLabel }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.card}>
        <Text style={styles.label}>Score</Text>
        <Text style={styles.value}>{score}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Moves</Text>
        <Text style={styles.value}>{moves}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Time</Text>
        <Text style={styles.value}>{time}s</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Level</Text>
        <Text style={styles.value}>{levelLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  card: {
    width: '23%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  label: {
    color: MEMORY_THEME.muted,
    fontSize: 11,
    marginBottom: 4,
  },
  value: {
    color: MEMORY_THEME.text,
    fontWeight: '900',
    fontSize: 16,
  },
});