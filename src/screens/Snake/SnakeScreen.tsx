import React, { useMemo } from 'react';
import {
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScreenWrapper from '../../components/layout/ScreenWrapper';
import Container from '../../components/layout/Container';
import Header from '../../components/common/Header';
import AppButton from '../../components/common/AppButton';
import { COLORS } from '../../constants/colors';

import SnakeBoard from './components/SnakeBoard';
import SnakeControls from './components/SnakeControls';
import SnakeHeader from './components/SnakeHeader';
import { useSnakeGame } from './hooks/useSnakeGame';
import { Direction } from './types';

export default function SnakeScreen() {
  const {
    snake,
    food,
    score,
    bestScore,
    isPaused,
    isGameOver,
    updateDirection,
    togglePause,
    resetGame,
    closeGameOver,
  } = useSnakeGame();

  const insets = useSafeAreaInsets();

  const onSwipe = (direction: Direction) => {
    updateDirection(direction);
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) =>
          Math.abs(gesture.dx) > 10 || Math.abs(gesture.dy) > 10,
        onPanResponderRelease: (_, gesture) => {
          const { dx, dy } = gesture;

          if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) onSwipe('RIGHT');
            else onSwipe('LEFT');
          } else {
            if (dy > 0) onSwipe('DOWN');
            else onSwipe('UP');
          }
        },
      }),
    [],
  );

  return (
    <ScreenWrapper>
      <Container>
        <View style={[styles.content, { paddingBottom: insets.bottom + 12 }]}>
          <View>
            <Header
              title="Snake Game"
              subtitle="Swipe or use controls to move the snake"
            />

            <SnakeHeader
              score={score}
              bestScore={bestScore}
              isPaused={isPaused}
              onPausePress={togglePause}
            />
          </View>

          <View style={styles.centerSection}>
            <LinearGradient
              colors={['rgba(56,189,248,0.08)', 'rgba(34,197,94,0.08)']}
              style={styles.boardCard}
              {...panResponder.panHandlers}
            >
              <SnakeBoard snake={snake} food={food} />
            </LinearGradient>
          </View>

          <View style={styles.bottomSection}>
            <SnakeControls onChangeDirection={updateDirection} />

            <View style={styles.bottomActions}>
              <AppButton title="Restart Game" onPress={resetGame} />
            </View>
          </View>
        </View>

        <Modal visible={isGameOver} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.gameOverTitle}>Game Over</Text>
              <Text style={styles.gameOverText}>Your score: {score}</Text>
              <Text style={styles.gameOverSub}>Best score: {bestScore}</Text>

              <AppButton
                title="Play Again"
                onPress={resetGame}
                style={{ marginTop: 18 }}
              />

              <Pressable onPress={closeGameOver} style={styles.closeBtn}>
                <Text style={styles.closeText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </Container>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  centerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  bottomSection: {
    alignItems: 'center',
  },
  boardCard: {
    borderRadius: 30,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  bottomActions: {
    marginTop: 16,
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
  },
  modalCard: {
    width: '100%',
    borderRadius: 28,
    backgroundColor: '#0D1728',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    padding: 22,
  },
  gameOverTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
  },
  gameOverText: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 10,
  },
  gameOverSub: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: 6,
  },
  closeBtn: {
    marginTop: 12,
    alignItems: 'center',
  },
  closeText: {
    color: COLORS.muted,
    fontWeight: '700',
  },
});