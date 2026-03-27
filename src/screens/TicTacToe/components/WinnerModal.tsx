import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Player } from '../types';

type Props = {
  visible: boolean;
  winner: Player | null;
  isDraw: boolean;
  onRestart: () => void;
};

export default function WinnerModal({
  visible,
  winner,
  isDraw,
  onRestart,
}: Props) {
  const title = winner ? `${winner} Wins!` : isDraw ? 'Draw Game' : '';

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>

          <Pressable style={styles.button} onPress={onRestart}>
            <Text style={styles.buttonText}>Play Again</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    borderRadius: 24,
    backgroundColor: '#0F172A',
    padding: 24,
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  buttonText: {
    color: '#0F172A',
    fontWeight: '900',
  },
});