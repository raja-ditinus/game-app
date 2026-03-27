import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import Container from '../../components/layout/Container';
import Header from '../../components/common/Header';
import LudoBoard from './components/LudoBoard';
import Dice from './components/Dice';
import PlayerPanel from './components/PlayerPanel';
import TurnBanner from './components/TurnBanner';
import WinModal from './components/WinModal';
import { PLAYER_COLORS } from './constants';
import { useLudoGame } from './hooks/useLudoGame';

export default function LudoScreen() {
  const {
    currentPlayer,
    diceValue,
    players,
    winner,
    isRolling,
    movableTokens,
    turnLocked,
    rollDice,
    moveToken,
    skipTurnIfNoMove,
    resetGame,
  } = useLudoGame();

  useEffect(() => {
    if (turnLocked && movableTokens.length === 0) {
      const timer = setTimeout(() => {
        skipTurnIfNoMove();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [turnLocked, movableTokens.length, skipTurnIfNoMove]);

  return (
    <ScreenWrapper>
      <Container>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Header title="Ludo Game" subtitle="Advanced classic ludo board" />

          <TurnBanner currentPlayer={currentPlayer} diceValue={diceValue} />

          <View style={styles.playersRow}>
            {PLAYER_COLORS.map(color => (
              <PlayerPanel
                key={color}
                color={color}
                isActive={currentPlayer === color}
                finishedCount={players[color].finishedCount}
              />
            ))}
          </View>

          <View style={styles.boardWrap}>
            <LudoBoard
              players={players}
              currentPlayer={currentPlayer}
              movableTokenIds={movableTokens.map(item => item.id)}
              onTokenPress={moveToken}
            />
          </View>

          <View style={styles.diceWrap}>
            <Dice
              value={isRolling ? '...' : diceValue}
              onRoll={rollDice}
              disabled={turnLocked || !!winner}
            />
          </View>
        </ScrollView>

        <WinModal
          visible={!!winner}
          winner={winner}
          onRestart={resetGame}
        />
      </Container>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 24,
  },
  playersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  boardWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  diceWrap: {
    alignItems: 'center',
    marginTop: 20,
  },
});