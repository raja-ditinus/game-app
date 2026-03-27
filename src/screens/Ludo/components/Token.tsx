import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PlayerColor } from '../types';
import { PLAYER_THEME } from '../constants';

type Props = {
  color: PlayerColor;
  size?: number;
  active?: boolean;
};

export default function Token({ color, size = 18, active = false }: Props) {
  return (
    <View
      style={[
        styles.token,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: PLAYER_THEME[color],
          transform: [{ scale: active ? 1.1 : 1 }],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  token: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 3,
  },
});