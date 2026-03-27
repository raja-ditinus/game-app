import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MEMORY_THEME } from '../constants';

type Props = {
  visible: boolean;
  onStart: () => void;
  onSelectLevel: (level: 'easy' | 'medium' | 'hard') => void;
};

export default function StartOverlay({
  visible,
  onStart,
  onSelectLevel,
}: Props) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>Memory Game</Text>
        <Text style={styles.subtitle}>Match all cards as fast as you can</Text>

        <View style={styles.levelRow}>
          <Pressable style={styles.levelBtn} onPress={() => onSelectLevel('easy')}>
            <Text style={styles.levelText}>Easy</Text>
          </Pressable>

          <Pressable style={styles.levelBtn} onPress={() => onSelectLevel('medium')}>
            <Text style={styles.levelText}>Medium</Text>
          </Pressable>

          <Pressable style={styles.levelBtn} onPress={() => onSelectLevel('hard')}>
            <Text style={styles.levelText}>Hard</Text>
          </Pressable>
        </View>

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
    backgroundColor: MEMORY_THEME.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
  },
  card: {
    width: '100%',
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  title: {
    color: MEMORY_THEME.text,
    fontSize: 28,
    fontWeight: '900',
  },
  subtitle: {
    color: MEMORY_THEME.muted,
    marginTop: 8,
    textAlign: 'center',
  },
  levelRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  levelBtn: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  levelText: {
    color: MEMORY_THEME.text,
    fontWeight: '800',
  },
  button: {
    marginTop: 22,
    backgroundColor: MEMORY_THEME.accent,
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