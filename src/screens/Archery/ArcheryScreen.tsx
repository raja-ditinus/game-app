import React, { useMemo } from 'react';
import { PanResponder, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import Container from '../../components/layout/Container';
import Header from '../../components/common/Header';
import { BOW_X, BOW_Y, COLORS, GROUND_Y } from './constants';
import { useArcheryGame } from './hooks/useArcheryGame';
import Bow from './components/Bow';
import Arrow from './components/Arrow';
import Target from './components/Target';
import AimGuide from './components/AimGuide';
import Hud from './components/Hud';
import StartOverlay from './components/StartOverlay';
import GameOverModal from './components/GameOverModal';

export default function ArcheryScreen() {
  const {
    score,
    bestScore,
    timeLeft,
    arrowsLeft,
    combo,
    perfectHits,
    isStarted,
    isGameOver,
    isPulling,
    pullCurrent,
    activeArrow,
    target,
    flashHit,
    shotText,
    startGame,
    resetGame,
    beginPull,
    updatePull,
    releaseArrow,
    isStarting,
  } = useArcheryGame();

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: evt => {
          beginPull({
            x: evt.nativeEvent.locationX,
            y: evt.nativeEvent.locationY,
          });
        },
        onPanResponderMove: evt => {
          updatePull({
            x: evt.nativeEvent.locationX,
            y: evt.nativeEvent.locationY,
          });
        },
        onPanResponderRelease: () => {
          releaseArrow();
        },
        onPanResponderTerminate: () => {
          releaseArrow();
        },
      }),
    [beginPull, updatePull, releaseArrow],
  );

  return (
    <ScreenWrapper>
      <Container>
        <View style={styles.content}>
          <Header
            title="Archery Master"
            subtitle="Pull, aim, and hit the moving target"
          />

          <Hud
            score={score}
            bestScore={bestScore}
            timeLeft={timeLeft}
            arrowsLeft={arrowsLeft}
            combo={combo}
            perfectHits={perfectHits}
          />

          <View
            style={styles.gameArea}
            {...(isStarted ? panResponder.panHandlers : {})}
          >
            <LinearGradient colors={['#08111F', '#111827']} style={styles.canvas}>
              <View style={styles.lightGlow} />
              <View style={styles.ground} />

              <Target
                x={target.x}
                y={target.y}
                radius={target.radius}
                flash={flashHit}
              />

              <Bow />

              <AimGuide
                from={{ x: BOW_X + 18, y: BOW_Y + 42 }}
                to={pullCurrent}
                visible={isPulling}
              />

              {activeArrow ? (
                <Arrow
                  x={activeArrow.position.x}
                  y={activeArrow.position.y}
                  angle={activeArrow.angle}
                />
              ) : (
                <Arrow x={BOW_X + 8} y={BOW_Y + 38} angle={0} />
              )}

              {!!shotText && <Text style={styles.shotText}>{shotText}</Text>}

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
          perfectHits={perfectHits}
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
    minHeight: 320,
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  ground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: GROUND_Y,
    height: 6,
    backgroundColor: '#16A34A',
  },
  lightGlow: {
    position: 'absolute',
    top: -20,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(56,189,248,0.10)',
  },
  shotText: {
    position: 'absolute',
    top: 22,
    alignSelf: 'center',
    color: '#FDE68A',
    fontSize: 24,
    fontWeight: '900',
  },
});