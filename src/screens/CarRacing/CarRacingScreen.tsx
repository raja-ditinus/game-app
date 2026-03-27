import React from 'react';
import { StyleSheet, View } from 'react-native';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import Container from '../../components/layout/Container';
import Header from '../../components/common/Header';
import { useCarRacingGame } from './hooks/useCarRacingGame';
import Hud from './components/Hud';
import Road from './components/Road';
import ControlPad from './components/ControlPad';
import StartOverlay from './components/StartOverlay';
import GameOverModal from './components/GameOverModal';

export default function CarRacingScreen() {
  const {
    score,
    bestScore,
    speed,
    isStarted,
    isPaused,
    isGameOver,
    playerLane,
    enemies,
    moveLeft,
    moveRight,
    startGame,
    togglePause,
    resetGame,
    boost
  } = useCarRacingGame();

  return (
    <ScreenWrapper>
      <Container>
        <Header
          title="Car Racing"
          subtitle="Advanced endless racing game"
        />

        <Hud
          score={score}
          bestScore={bestScore}
          speed={speed}
          isPaused={isPaused}
          onPause={togglePause}
        />

        <View style={styles.center}>
          <Road playerLane={playerLane} enemies={enemies} />
        </View>

        <ControlPad onLeft={moveLeft} onRight={moveRight}  onBoost={boost}/>

        <StartOverlay
          visible={!isStarted && !isGameOver}
          bestScore={bestScore}
          onStart={startGame}
        />

        <GameOverModal
          visible={isGameOver}
          score={score}
          bestScore={bestScore}
          onRestart={resetGame}
        />
      </Container>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});