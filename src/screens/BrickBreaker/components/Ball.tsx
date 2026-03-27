import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BallType } from '../types';
import { COLORS } from '../constants';

type Props = {
  ball: BallType;
};

export default function Ball({ ball }: Props) {
  return (
    <View
      style={[
        styles.ball,
        {
          left: ball.x,
          top: ball.y,
          width: ball.size,
          height: ball.size,
          borderRadius: ball.size / 2,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  ball: {
    position: 'absolute',
    backgroundColor: COLORS.ball,
    shadowColor: COLORS.ball,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
});