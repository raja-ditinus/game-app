import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS, ENEMY_HEIGHT, ENEMY_WIDTH } from '../constants';

type Props = {
  x: number;
  y: number;
};

export default function EnemyShip({ x, y }: Props) {
  return (
    <View style={[styles.wrap, { left: x, top: y }]}>
      <View style={styles.body} />
      <View style={styles.eye} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    width: ENEMY_WIDTH,
    height: ENEMY_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    width: ENEMY_WIDTH,
    height: ENEMY_HEIGHT,
    borderRadius: 14,
    backgroundColor: COLORS.enemy,
  },
  eye: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFF1F2',
  },
});