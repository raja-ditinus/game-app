import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BULLET_HEIGHT, BULLET_WIDTH, COLORS } from '../constants';

type Props = {
  x: number;
  y: number;
};

export default function Bullet({ x, y }: Props) {
  return <View style={[styles.bullet, { left: x, top: y }]} />;
}

const styles = StyleSheet.create({
  bullet: {
    position: 'absolute',
    width: BULLET_WIDTH,
    height: BULLET_HEIGHT,
    borderRadius: 6,
    backgroundColor: COLORS.bullet,
    shadowColor: COLORS.bullet,
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },
});