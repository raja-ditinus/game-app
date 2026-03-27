import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  visible: boolean;
  score: number;
  bestScore: number;
  onRestart: () => void;
};

export default function GameOverModal({
  visible,
  score,
  bestScore,
  onRestart,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Game Over</Text>
          <Text style={styles.score}>Score: {score}</Text>
          <Text style={styles.best}>Best: {bestScore}</Text>

          <Pressable style={styles.button} onPress={onRestart}>
            <Text style={styles.buttonText}>Restart</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.48)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
  },
  card: {
    width: '100%',
    borderRadius: 26,
    backgroundColor: '#0F172A',
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
  },
  score: {
    color: '#FFFFFF',
    marginTop: 12,
    fontSize: 18,
    fontWeight: '800',
  },
  best: {
    color: '#CBD5E1',
    marginTop: 6,
    fontSize: 14,
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