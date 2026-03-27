import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PLAYER_THEME } from '../constants';
import { PlayerColor } from '../types';

type Props = {
  currentPlayer: PlayerColor;
  diceValue: number;
};

export default function TurnBanner({ currentPlayer, diceValue }: Props) {
  return (
    <View
      style={[
        styles.banner,
        { borderColor: PLAYER_THEME[currentPlayer] },
      ]}
    >
      <Text style={styles.title}>
        {currentPlayer.toUpperCase()} TURN
      </Text>
      <Text style={styles.subtitle}>Dice: {diceValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderWidth: 1.5,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginBottom: 14,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  subtitle: {
    color: '#CBD5E1',
    fontSize: 12,
    marginTop: 2,
    fontWeight: '700',
  },
});