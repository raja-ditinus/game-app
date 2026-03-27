import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../constants';
import { Point } from '../types';

type Props = {
  from: Point;
  to: Point;
  visible: boolean;
};

export default function AimGuide({ from, to, visible }: Props) {
  if (!visible) return null;

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return (
    <View
      style={[
        styles.line,
        {
          left: from.x,
          top: from.y,
          width: length,
          transform: [{ rotate: `${angle}deg` }],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  line: {
    position: 'absolute',
    height: 3,
    borderRadius: 999,
    backgroundColor: COLORS.guide,
    transformOrigin: 'left center' as never,
  },
});