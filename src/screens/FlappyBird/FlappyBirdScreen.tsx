import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import Container from '../../components/layout/Container';
import Header from '../../components/common/Header';
import { GAME_HEIGHT } from './constants';
import { useFlappyBirdGame } from './hooks/useFlappyBirdGame';
import Background from './components/Background';
import Pipe from './components/Pipe';
import Bird from './components/Bird';

export default function FlappyBirdScreen() {
  const {
    bird,
    pipes,
    score,
    bestScore,
    rotation,
    isStarted,
    isGameOver,
    isStarting,
    flashHit,
    startGame,
    resetGame,
    flap,
  } = useFlappyBirdGame();

  return (
    <ScreenWrapper>
      <Container>
        <Header
          title="Flappy Bird"
          subtitle="Tap to flap through the pipes"
        />

        <Pressable style={styles.gameArea} onPress={isStarted ? flap : undefined}>
          <View style={styles.canvas}>
            <Background />

            {pipes.map(pipe => (
              <Pipe key={pipe.id} pipe={pipe} />
            ))}

            <Bird y={bird.y} rotation={rotation} isStarted={isStarted} />

            <View style={styles.hudRow}>
              <View style={styles.hudCard}>
                <Text style={styles.hudLabel}>Score</Text>
                <Text style={styles.hudValue}>{score}</Text>
              </View>
              <View style={styles.hudCard}>
                <Text style={styles.hudLabel}>Best</Text>
                <Text style={styles.hudValue}>{bestScore}</Text>
              </View>
            </View>

            {!isStarted && !isGameOver && (
              <Pressable style={styles.btn} onPress={startGame}>
                <Text style={styles.btnText}>
                  {isStarting ? 'Starting...' : 'Start Match'}
                </Text>
              </Pressable>
            )}

            {isGameOver && (
              <Pressable style={styles.btn} onPress={resetGame}>
                <Text style={styles.btnText}>Restart</Text>
              </Pressable>
            )}

            {flashHit && <View style={styles.hitFlash} />}
          </View>
        </Pressable>
      </Container>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
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
    borderColor: 'rgba(0,0,0,0.18)',
  },
  hudRow: {
    position: 'absolute',
    top: 18,
    left: 14,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  hudCard: {
    flex: 1,
    backgroundColor: 'rgba(8,17,31,0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  hudLabel: {
    color: '#EAFBFF',
    fontSize: 11,
    marginBottom: 2,
  },
  hudValue: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  btn: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  btnText: {
    fontWeight: '900',
    color: '#0F172A',
  },
  hitFlash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,80,80,0.22)',
  },
});