import React, { useMemo } from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import Container from '../../components/layout/Container';
import Header from '../../components/common/Header';
import {
  COLORS,
  GAME_HEIGHT,
} from './constants';
import { useSpaceShooterGame } from './hooks/useSpaceShooterGame';
import Hud from './components/Hud';
import PlayerShip from './components/PlayerShip';
import EnemyShip from './components/EnemyShip';
import Bullet from './components/Bullet';
import StartOverlay from './components/StartOverlay';
import GameOverModal from './components/GameOverModal';

export default function SpaceShooterScreen() {
  const {
    score,
    bestScore,
    lives,
    isStarted,
    isGameOver,
    isStarting,
    player,
    bullets,
    enemies,
    startGame,
    resetGame,
    movePlayer,
  } = useSpaceShooterGame();

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: evt => {
          movePlayer(evt.nativeEvent.locationX);
        },
      }),
    [movePlayer],
  );

  return (
    <ScreenWrapper>
      <Container>
        <View style={styles.content}>
          <Header
            title="Space Shooter"
            subtitle="Move your ship and destroy incoming enemies"
          />

          <Hud score={score} bestScore={bestScore} lives={lives} />

          <View
            style={styles.gameArea}
            {...(isStarted ? panResponder.panHandlers : {})}
          >
            <LinearGradient colors={['#08111F', '#111827']} style={styles.canvas}>
              {enemies.map(enemy => (
                <EnemyShip key={enemy.id} x={enemy.x} y={enemy.y} />
              ))}

              {bullets.map(bullet => (
                <Bullet key={bullet.id} x={bullet.x} y={bullet.y} />
              ))}

              <PlayerShip x={player.x} y={player.y} />

              <StartOverlay
                visible={!isStarted && !isGameOver}
                onStart={startGame}
                disabled={isStarting}
              />
            </LinearGradient>
          </View>
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
  content: {
    flex: 1,
  },
  gameArea: {
    flex: 1,
    marginTop: 8,
    minHeight: 320,
  },
  canvas: {
    flex: 1,
    minHeight: GAME_HEIGHT,
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});