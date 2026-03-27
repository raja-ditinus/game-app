import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../constants';

type Props = {
  x: number;
  y: number;
  angle: number;
};

export default function Arrow({ x, y, angle }: Props) {
  return (
    <View
      style={[
        styles.wrap,
        {
          left: x,
          top: y,
          transform: [{ rotate: `${angle}deg` }],
        },
      ]}
    >
      <View style={styles.tip} />
      <View style={styles.shaft} />
      <View style={styles.featherTop} />
      <View style={styles.featherBottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    width: 38,
    height: 8,
    justifyContent: 'center',
  },
  shaft: {
    position: 'absolute',
    left: 6,
    width: 24,
    height: 2,
    backgroundColor: COLORS.arrow,
  },
  tip: {
    position: 'absolute',
    right: 0,
    width: 0,
    height: 0,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderLeftWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: COLORS.arrowTip,
  },
  featherTop: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 8,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#60A5FA',
  },
  featherBottom: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 8,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#FCD34D',
  },
});