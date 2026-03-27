import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants';

type Props = {
  visible: boolean;
  score: number;
  onRestart: () => void;
};

export default function GameOverModal({ visible, score, onRestart }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Game Over</Text>
          <Text style={styles.subtitle}>Final Score: {score}</Text>

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
    borderColor: 'rgba(255,255,255,0.12)',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
  },
  subtitle: {
    color: COLORS.muted,
    marginTop: 8,
    fontSize: 15,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#fff',
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