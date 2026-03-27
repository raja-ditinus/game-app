import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants';

type Props = {
  visible: boolean;
  onStart: () => void;
};

export default function StartOverlay({ visible, onStart }: Props) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>Brick Breaker</Text>
        <Text style={styles.subtitle}>Drag to move the paddle and break all bricks.</Text>

        <Pressable style={styles.button} onPress={onStart}>
          <Text style={styles.buttonText}>Start Game</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
  },
  card: {
    width: '100%',
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
  },
  subtitle: {
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  button: {
    marginTop: 22,
    backgroundColor: COLORS.paddle,
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 16,
  },
  buttonText: {
    color: '#03111D',
    fontWeight: '900',
    fontSize: 15,
  },
});