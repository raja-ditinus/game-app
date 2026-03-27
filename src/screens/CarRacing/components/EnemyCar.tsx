import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  color: string;
};

export default function EnemyCar({ color }: Props) {
  return (
    <View style={[styles.car, { backgroundColor: color }]}>
      <View style={styles.window} />
      <View style={styles.lightLeft} />
      <View style={styles.lightRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  car: {
    width: 52,
    height: 92,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  window: {
    width: 24,
    height: 18,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  lightLeft: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFB4B4',
  },
  lightRight: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFB4B4',
  },
});