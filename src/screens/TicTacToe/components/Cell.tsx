import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { CellValue } from '../types';

type Props = {
  value: CellValue;
  onPress: () => void;
  isWinningCell?: boolean;
};

export default function Cell({
  value,
  onPress,
  isWinningCell = false,
}: Props) {
  return (
    <Pressable
      style={[styles.cell, isWinningCell && styles.winningCell]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.value,
          value === 'X' && styles.xText,
          value === 'O' && styles.oText,
        ]}
      >
        {value}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  winningCell: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderColor: '#22C55E',
  },
  value: {
    fontSize: 40,
    fontWeight: '900',
  },
  xText: {
    color: '#38BDF8',
  },
  oText: {
    color: '#F59E0B',
  },
});