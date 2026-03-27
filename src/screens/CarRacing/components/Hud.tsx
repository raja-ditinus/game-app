import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CAR_COLORS } from '../constants';

type Props = {
  score: number;
  bestScore: number;
  speed: number;
  isPaused: boolean;
  onPause: () => void;
};

export default function Hud({
  score,
  bestScore,
  speed,
  isPaused,
  onPause,
}: Props) {
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
        <Text style={styles.label}>Speed</Text>
        <Text style={styles.value}>{speed.toFixed(1)}</Text>
      </View>

      <Pressable style={styles.pauseBtn} onPress={onPause}>
        <Text style={styles.pauseText}>{isPaused ? '▶' : 'II'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    alignItems: 'stretch',
  },
  card: {
    flex: 1,
    backgroundColor: CAR_COLORS.hud,
    borderWidth: 1,
    borderColor: CAR_COLORS.hudBorder,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  label: {
    color: CAR_COLORS.muted,
    fontSize: 11,
    marginBottom: 3,
  },
  value: {
    color: CAR_COLORS.text,
    fontWeight: '900',
    fontSize: 18,
  },
  pauseBtn: {
    width: 56,
    borderRadius: 18,
    backgroundColor: '#38BDF8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseText: {
    color: '#03111D',
    fontSize: 20,
    fontWeight: '900',
  },
});