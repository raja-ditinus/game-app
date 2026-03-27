import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Player } from '../types';

type Props = {
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
};

export default function GameStatus({
  currentPlayer,
  winner,
  isDraw,
}: Props) {
  const getMessage = () => {
    if (winner) return `${winner} Wins!`;
    if (isDraw) return 'Draw Game';
    return `${currentPlayer}'s Turn`;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{getMessage()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    marginBottom: 18,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
});