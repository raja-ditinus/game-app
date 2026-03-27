import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants';

type Props = {
  visible: boolean;
  score: number;
  perfectHits: number;
  onRestart: () => void;
};

export default function GameOverModal({
  visible,
  score,
  perfectHits,
  onRestart,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Match Over</Text>
          <Text style={styles.score}>Score: {score}</Text>
          <Text style={styles.perfect}>Perfect Hits: {perfectHits}</Text>

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
    backgroundColor: COLORS.overlay,
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
    borderColor: COLORS.border,
  },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '900',
  },
  score: {
    color: COLORS.text,
    marginTop: 12,
    fontSize: 18,
    fontWeight: '800',
  },
  perfect: {
    color: COLORS.muted,
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