import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { PLAYER_THEME } from '../constants';
import { PlayerColor } from '../types';

type Props = {
  visible: boolean;
  winner: PlayerColor | null;
  onRestart: () => void;
};

export default function WinModal({ visible, winner, onRestart }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Winner</Text>
          <Text
            style={[
              styles.winner,
              { color: winner ? PLAYER_THEME[winner] : '#FFFFFF' },
            ]}
          >
            {winner ? winner.toUpperCase() : ''}
          </Text>

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
    backgroundColor: '#0F172A',
    borderRadius: 22,
    padding: 22,
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  winner: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: '900',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#0F172A',
    fontWeight: '900',
  },
});