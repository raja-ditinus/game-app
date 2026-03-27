import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PaddleType } from '../types';
import { COLORS } from '../constants';

type Props = {
  paddle: PaddleType;
};

export default function Paddle({ paddle }: Props) {
  return (
    <View
      style={[
        styles.paddle,
        {
          left: paddle.x,
          top: paddle.y,
          width: paddle.width,
          height: paddle.height,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  paddle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: COLORS.paddle,
    shadowColor: COLORS.paddle,
    shadowOpacity: 0.45,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
});