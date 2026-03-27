import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../constants/colors';

type Props = {
  score: number;
  bestScore: number;
  isPaused: boolean;
  onPausePress: () => void;
};

export default function SnakeHeader({ score, bestScore, isPaused, onPausePress }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.box}>
        <Text style={styles.label}>Score</Text>
        <Text style={styles.value}>{score}</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.label}>Best</Text>
        <Text style={styles.value}>{bestScore}</Text>
      </View>

      <Pressable style={styles.pauseButton} onPress={onPausePress}>
        <Text style={styles.pauseText}>{isPaused ? 'Resume' : 'Pause'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 4,
  },
  box: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingVertical: 1,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  label: {
    color: COLORS.muted,
    fontSize: 15,
    marginBottom: 2,
    fontWeight: '900',
  },
  value: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '900',
  },
  pauseButton: {
    minWidth: 70,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  pauseText: {
    color: '#04111D',
    fontWeight: '800',
  },
});