import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScoreState } from '../types';

type Props = {
  scores: ScoreState;
};

export default function ScoreBoard({ scores }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.card}>
        <Text style={styles.label}>Player X</Text>
        <Text style={[styles.value, { color: '#38BDF8' }]}>{scores.X}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Draw</Text>
        <Text style={[styles.value, { color: '#FFFFFF' }]}>{scores.draw}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Player O</Text>
        <Text style={[styles.value, { color: '#F59E0B' }]}>{scores.O}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  card: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
  },
  label: {
    color: '#CBD5E1',
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    fontSize: 22,
    fontWeight: '900',
  },
});