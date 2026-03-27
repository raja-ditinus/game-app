import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  value: number | string;
  onRoll: () => void;
  disabled?: boolean;
};

export default function Dice({ value, onRoll, disabled = false }: Props) {
  return (
    <Pressable
      style={[styles.dice, disabled && styles.disabled]}
      onPress={onRoll}
      disabled={disabled}
    >
      <Text style={styles.text}>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dice: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  disabled: {
    opacity: 0.65,
  },
  text: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0F172A',
  },
});