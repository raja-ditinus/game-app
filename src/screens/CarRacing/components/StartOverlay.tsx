import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CAR_COLORS } from '../constants';

type Props = {
  visible: boolean;
  bestScore: number;
  onStart: () => void;
};

export default function StartOverlay({ visible, bestScore, onStart }: Props) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>Car Racing</Text>
        <Text style={styles.subtitle}>Top-view endless arcade race</Text>
        <Text style={styles.best}>Best Score: {bestScore}</Text>

        <Pressable style={styles.button} onPress={onStart}>
          <Text style={styles.buttonText}>Start Race</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: CAR_COLORS.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
  },
  card: {
    width: '100%',
    borderRadius: 26,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    padding: 24,
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: '#CBD5E1',
    marginTop: 8,
    fontSize: 14,
  },
  best: {
    color: '#FFFFFF',
    marginTop: 14,
    fontWeight: '800',
  },
  button: {
    marginTop: 22,
    backgroundColor: '#22C55E',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 16,
  },
  buttonText: {
    color: '#04111D',
    fontWeight: '900',
    fontSize: 15,
  },
});