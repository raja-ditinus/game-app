import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import Container from '../../components/layout/Container';
import Header from '../../components/common/Header';
import { MEMORY_THEME } from './constants';
import { useMemoryGame } from './hooks/useMemoryGame';
import Hud from './components/Hud';
import MemoryGrid from './components/MemoryGrid';
import StartOverlay from './components/StartOverlay';
import GameOverModal from './components/GameOverModal';

export default function MemoryScreen() {
  const {
    level,
    cards,
    moves,
    time,
    score,
    isStarted,
    isGameOver,
    columns,
    levelLabel,
    startGame,
    restartGame,
    handleCardPress,
    setLevel,
  } = useMemoryGame();

  return (
    <ScreenWrapper>
      <Container>
        <Header
          title="Memory Game"
          subtitle="Flip cards, find matches, and finish fast"
        />

        <Hud
          score={score}
          moves={moves}
          time={time}
          levelLabel={levelLabel}
        />

        <LinearGradient
          colors={['rgba(56,189,248,0.08)', 'rgba(255,255,255,0.04)']}
          style={styles.boardCard}
        >
          <MemoryGrid
            cards={cards}
            columns={columns}
            onCardPress={handleCardPress}
          />
        </LinearGradient>

        <View style={styles.actions}>
          <Pressable style={styles.secondaryButton} onPress={() => restartGame(level)}>
            <Text style={styles.secondaryButtonText}>Restart</Text>
          </Pressable>
        </View>

        <StartOverlay
          visible={!isStarted && !isGameOver}
          onStart={startGame}
          onSelectLevel={nextLevel => {
            setLevel(nextLevel);
            restartGame(nextLevel);
          }}
        />

        <GameOverModal
          visible={isGameOver}
          score={score}
          moves={moves}
          time={time}
          onRestart={() => restartGame(level)}
        />
      </Container>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  boardCard: {
    borderRadius: 24,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  actions: {
    marginTop: 18,
  },
  secondaryButton: {
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: MEMORY_THEME.text,
    fontWeight: '800',
  },
});