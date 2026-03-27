import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Direction } from '../types';

type Props = {
  onChangeDirection: (direction: Direction) => void;
};

export default function SnakeControls({ onChangeDirection }: Props) {
  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.btn} onPress={() => onChangeDirection('UP')}>
        <Text style={styles.icon}>↑</Text>
      </Pressable>

      <View style={styles.row}>
        <Pressable style={styles.btn} onPress={() => onChangeDirection('LEFT')}>
          <Text style={styles.icon}>←</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={() => onChangeDirection('RIGHT')}>
          <Text style={styles.icon}>→</Text>
        </Pressable>
      </View>

      <Pressable style={styles.btn} onPress={() => onChangeDirection('DOWN')}>
        <Text style={styles.icon}>↓</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginTop: 0,
  },
  row: {
    flexDirection: 'row',
    gap: 50,
    marginVertical: 10,
  },
  btn: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },
});