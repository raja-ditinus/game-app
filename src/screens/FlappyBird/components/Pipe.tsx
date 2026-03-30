import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  PIPE_WIDTH,
  PIPE_GAP,
  GAME_HEIGHT,
  GROUND_HEIGHT,
} from '../constants';
import { PipeType } from '../types';

type Props = {
  pipe: PipeType;
};

export default function Pipe({ pipe }: Props) {
  const gapTop = pipe.gapY - PIPE_GAP / 2;
  const gapBottom = pipe.gapY + PIPE_GAP / 2;

  const topPipeHeight = Math.max(40, gapTop);
  const bottomPipeTop = gapBottom;
  const bottomPipeHeight = Math.max(
    40,
    GAME_HEIGHT - GROUND_HEIGHT - bottomPipeTop,
  );

  return (
    <>
      <View
        style={[
          styles.pipe,
          {
            left: pipe.x,
            top: 0,
            height: topPipeHeight,
          },
        ]}
      >
        <View style={styles.lightStrip} />
        <View style={styles.darkStrip} />
        <View style={styles.capBottom} />
      </View>

      <View
        style={[
          styles.pipe,
          {
            left: pipe.x,
            top: bottomPipeTop,
            height: bottomPipeHeight,
          },
        ]}
      >
        <View style={styles.lightStrip} />
        <View style={styles.darkStrip} />
        <View style={styles.capTop} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  pipe: {
    position: 'absolute',
    width: PIPE_WIDTH,
    backgroundColor: '#94C83D',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: '#578B1E',
    overflow: 'visible',
  },
  lightStrip: {
    position: 'absolute',
    left: 5,
    top: 0,
    bottom: 0,
    width: 10,
    backgroundColor: '#D6F47B',
  },
  darkStrip: {
    position: 'absolute',
    right: 5,
    top: 0,
    bottom: 0,
    width: 8,
    backgroundColor: '#578B1E',
    opacity: 0.45,
  },
  capBottom: {
    position: 'absolute',
    bottom: 0,
    left: -4,
    width: PIPE_WIDTH + 8,
    height: 16,
    backgroundColor: '#94C83D',
    borderWidth: 2,
    borderColor: '#578B1E',
  },
  capTop: {
    position: 'absolute',
    top: 0,
    left: -4,
    width: PIPE_WIDTH + 8,
    height: 16,
    backgroundColor: '#94C83D',
    borderWidth: 2,
    borderColor: '#578B1E',
  },
});