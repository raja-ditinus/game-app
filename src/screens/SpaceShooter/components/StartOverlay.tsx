import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants';

type Props = {
  visible: boolean;
  onStart: () => void;
  disabled?: boolean;
};

export default function StartOverlay({
  visible,
  onStart,
  disabled = false,
}: Props) {
  if (!visible) return null;

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <View style={styles.centerWrap} pointerEvents="auto">
        <View style={styles.card}>
          <Text style={styles.title}>Space Shooter</Text>
          <Text style={styles.subtitle}>
            Move your ship, auto-fire bullets, destroy enemies.
          </Text>

          <Pressable
            style={[styles.button, disabled && styles.buttonDisabled]}
            onPress={onStart}
            disabled={disabled}
          >
            <Text style={styles.buttonText}>
              {disabled ? 'Starting...' : 'Start Match'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerWrap: {
    width: '100%',
    paddingHorizontal: 22,
  },
  card: {
    width: '100%',
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: COLORS.muted,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    marginTop: 22,
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  buttonText: {
    color: '#03111D',
    fontWeight: '900',
    fontSize: 15,
  },
});