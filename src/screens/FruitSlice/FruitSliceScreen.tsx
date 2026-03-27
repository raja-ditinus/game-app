import React, { useMemo, useRef } from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import Container from '../../components/layout/Container';
import Header from '../../components/common/Header';
import Hud from './components/Hud';
import GameCanvas from './components/GameCanvas';
import StartOverlay from './components/StartOverlay';
import GameOverModal from './components/GameOverModal';
import { useFruitSliceGame } from './hooks/useFruitSliceGame';
import { SlashPoint } from './types';

export default function FruitSliceScreen() {
  const {
    fruits,
    score,
    combo,
    lives,
    isStarted,
    isGameOver,
    slashTrail,
    startGame,
    resetGame,
    onSlash,
    isStarting,
  } = useFruitSliceGame();

  const currentPathRef = useRef<SlashPoint[]>([]);

  const panResponder = useMemo(
  () =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (_, gesture) => {
        currentPathRef.current = [{ x: gesture.x0, y: gesture.y0 }];
      },

      onPanResponderMove: (_, gesture) => {
        const nextPoint = { x: gesture.moveX, y: gesture.moveY };
        const prevPoint =
          currentPathRef.current[currentPathRef.current.length - 1];

        const dx = nextPoint.x - prevPoint.x;
        const dy = nextPoint.y - prevPoint.y;
        const movedEnough = Math.sqrt(dx * dx + dy * dy) > 6;

        if (!movedEnough) return;

        currentPathRef.current.push(nextPoint);

        if (currentPathRef.current.length > 20) {
          currentPathRef.current = currentPathRef.current.slice(-20);
        }

        onSlash([...currentPathRef.current]);
      },

      onPanResponderRelease: () => {
        currentPathRef.current = [];
      },

      onPanResponderTerminate: () => {
        currentPathRef.current = [];
      },
    }),
  [onSlash],
);

  return (
    <ScreenWrapper>
      <Container>
        <Header
          title="Fruit Slice"
          subtitle="Swipe to slice fruits and avoid bombs"
        />

        <Hud score={score} combo={combo} lives={lives} />

        <View style={styles.canvasWrap} {...panResponder.panHandlers}>
          <GameCanvas fruits={fruits} slashTrail={slashTrail} />

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
  canvasWrap: {
    marginTop: 6,
  },
});