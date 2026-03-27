import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BallType, BrickType, PaddleType } from '../types';
import { COLORS, GAME_HEIGHT, GAME_WIDTH } from '../constants';
import Brick from './Brick';
import Ball from './Ball';
import Paddle from './Paddle';

type Props = {
  bricks: BrickType[];
  ball: BallType;
  paddle: PaddleType;
};

export default function GameBoard({ bricks, ball, paddle }: Props) {
  return (
    <LinearGradient colors={[COLORS.bgTop, COLORS.bgBottom]} style={styles.wrapper}>
      <View style={styles.board}>
        {bricks.map(brick => (
          <Brick key={brick.id} brick={brick} />
        ))}

        <Ball ball={ball} />
        <Paddle paddle={paddle} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    alignSelf: 'center',
    borderRadius: 26,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  board: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#08111F',
  },
});