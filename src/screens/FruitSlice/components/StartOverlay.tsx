import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { THEME } from '../constants';

type Props = {
  visible: boolean;
  onStart: () => void;
   disabled?: boolean;
};

export default function StartOverlay({ visible, onStart, disabled = false }: Props) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>Fruit Slice</Text>
        <Text style={styles.subtitle}>Swipe fast and slice fruits. Avoid bombs.</Text>

        <Pressable
          style={[styles.button, disabled && styles.buttonDisabled]}
          onPress={onStart}
          disabled={disabled}
        >
          <Text style={styles.buttonText}>
            {disabled ? 'Starting...' : 'Start Game'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: THEME.overlay,
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
    borderColor: THEME.border,
  },
  title: {
    color: THEME.text,
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: THEME.muted,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    marginTop: 22,
    backgroundColor: THEME.accent,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  buttonText: {
    color: '#03111D',
    fontWeight: '900',
    fontSize: 15,
  },
  buttonDisabled:{
    
  }
});