import React, { useMemo } from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import Container from '../../components/layout/Container';
import Header from '../../components/common/Header';
import Hud from './components/Hud';
import GameBoard from './components/GameBoard';
import StartOverlay from './components/StartOverlay';
import GameOverModal from './components/GameOverModal';
import { useBrickBreakerGame } from './hooks/useBrickBreakerGame';

export default function BrickBreakerScreen() {
  const {
    score,
    bestScore,
    lives,
    level,
    isStarted,
    isGameOver,
    ball,
    paddle,
    bricks,
    startGame,
    movePaddle,
    resetGame,
  } = useBrickBreakerGame();

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gesture) => {
          movePaddle(gesture.moveX);
        },
      }),
    [movePaddle],
  );

  return (
    <ScreenWrapper>
      <Container>
        <Header
          title="Brick Breaker"
          subtitle="Advanced arcade game with levels and lives"
        />

        <Hud
          score={score}
          lives={lives}
          level={level}
          bestScore={bestScore}
        />

        <View style={styles.boardWrap} {...panResponder.panHandlers}>
          <GameBoard bricks={bricks} ball={ball} paddle={paddle} />

          <StartOverlay visible={!isStarted && !isGameOver} onStart={startGame} />
        </View>

        <GameOverModal
          visible={isGameOver}
          score={score}
          onRestart={resetGame}
        />
      </Container>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  boardWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});