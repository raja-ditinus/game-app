import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../constants';

type Props = {
  x: number;
  y: number;
};

export default function PlayerShip({ x, y }: Props) {
  return (
    <View style={[styles.wrap, { left: x, top: y }]}>
      <View style={styles.wingLeft} />
      <View style={styles.body} />
      <View style={styles.wingRight} />
      <View style={styles.window} />
      <View style={styles.fire} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    width: 56,
    height: 72,
    alignItems: 'center',
  },
  body: {
    width: 28,
    height: 54,
    borderRadius: 18,
    backgroundColor: COLORS.ship,
    marginTop: 6,
  },
  wingLeft: {
    position: 'absolute',
    left: 2,
    top: 20,
    width: 18,
    height: 26,
    borderRadius: 10,
    backgroundColor: '#7DD3FC',
    transform: [{ rotate: '-18deg' }],
  },
  wingRight: {
    position: 'absolute',
    right: 2,
    top: 20,
    width: 18,
    height: 26,
    borderRadius: 10,
    backgroundColor: '#7DD3FC',
    transform: [{ rotate: '18deg' }],
  },
  window: {
    position: 'absolute',
    top: 14,
    width: 12,
    height: 14,
    borderRadius: 6,
    backgroundColor: '#E0F2FE',
  },
  fire: {
    position: 'absolute',
    bottom: 0,
    width: 10,
    height: 14,
    borderRadius: 8,
    backgroundColor: '#F59E0B',
  },
});