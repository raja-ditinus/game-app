import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { MEMORY_THEME } from '../constants';

type Props = {
  visible: boolean;
  score: number;
  moves: number;
  time: number;
  onRestart: () => void;
};

export default function GameOverModal({
  visible,
  score,
  moves,
  time,
  onRestart,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>You Win 🎉</Text>
          <Text style={styles.text}>Score: {score}</Text>
          <Text style={styles.text}>Moves: {moves}</Text>
          <Text style={styles.text}>Time: {time}s</Text>

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
  text: {
    color: MEMORY_THEME.muted,
    marginTop: 8,
    fontSize: 15,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: 15,
  },
  buttonText: {
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 15,
  },
});