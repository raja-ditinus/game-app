import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import Container from '../../components/layout/Container';
import Header from '../../components/common/Header';
import Board from './components/Board';
import GameStatus from './components/GameStatus';
import ScoreBoard from './components/ScoreBoard';
import WinnerModal from './components/WinnerModal';
import { useTicTacToe } from './hooks/useTicTacToe';

export default function TicTacToeScreen() {
  const {
    board,
    currentPlayer,
    winner,
    winningLine,
    isDraw,
    scores,
    handleCellPress,
    restartRound,
    resetMatch,
  } = useTicTacToe();

  return (
    <ScreenWrapper>
      <Container>
        <Header
          title="Tic Tac Toe"
          subtitle="Advanced mini game with score, win highlight and restart"
        />

        <ScoreBoard scores={scores} />

        <GameStatus
          currentPlayer={currentPlayer}
          winner={winner}
          isDraw={isDraw}
        />

        <View style={styles.boardWrap}>
          <Board
            board={board}
            winningLine={winningLine}
            onCellPress={handleCellPress}
          />
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.secondaryButton} onPress={restartRound}>
            <Text style={styles.secondaryButtonText}>Restart Round</Text>
          </Pressable>

          <Pressable style={styles.primaryButton} onPress={resetMatch}>
            <Text style={styles.primaryButtonText}>Reset Match</Text>
          </Pressable>
        </View>

        <WinnerModal
          visible={!!winner || isDraw}
          winner={winner}
          isDraw={isDraw}
          onRestart={restartRound}
        />
      </Container>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  boardWrap: {
    marginTop: 10,
    padding: 14,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 22,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#0F172A',
    fontWeight: '900',
  },
});