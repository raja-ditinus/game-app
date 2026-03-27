import React, { useMemo } from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLORS, GRID_SIZE, PLAYER_THEME, SAFE_STEPS } from '../constants';
import { HOME_PATHS, COMMON_PATH } from '../data/movementPaths';
import { getTokenBoardPosition, areSameCell } from '../utils/ludoHelpers';
import { PlayerColor, TokenType } from '../types';
import Token from './Token';

const screenWidth = Dimensions.get('window').width;
const boardSize = Math.min(screenWidth - 24, 390);
const cellSize = boardSize / GRID_SIZE;

type Props = {
  players: Record<PlayerColor, { tokens: TokenType[] }>;
  currentPlayer: PlayerColor;
  movableTokenIds: string[];
  onTokenPress: (tokenId: string) => void;
};

const isRedHome = (r: number, c: number) => r <= 5 && c <= 5;
const isGreenHome = (r: number, c: number) => r <= 5 && c >= 9;
const isBlueHome = (r: number, c: number) => r >= 9 && c <= 5;
const isYellowHome = (r: number, c: number) => r >= 9 && c >= 9;

const isTopMiddlePath = (r: number, c: number) => r >= 0 && r <= 5 && c >= 6 && c <= 8;
const isBottomMiddlePath = (r: number, c: number) => r >= 9 && r <= 14 && c >= 6 && c <= 8;
const isLeftMiddlePath = (r: number, c: number) => c >= 0 && c <= 5 && r >= 6 && r <= 8;
const isRightMiddlePath = (r: number, c: number) => c >= 9 && c <= 14 && r >= 6 && r <= 8;

const isGreenLane = (r: number, c: number) => c === 7 && r >= 1 && r <= 5;
const isBlueLane = (r: number, c: number) => c === 7 && r >= 9 && r <= 13;
const isRedLane = (r: number, c: number) => r === 7 && c >= 1 && c <= 5;
const isYellowLane = (r: number, c: number) => r === 7 && c >= 9 && c <= 13;

const redStartArrow = (r: number, c: number) => r === 7 && c === 0;
const greenStartArrow = (r: number, c: number) => r === 0 && c === 7;
const yellowStartArrow = (r: number, c: number) => r === 7 && c === 14;
const blueStartArrow = (r: number, c: number) => r === 14 && c === 7;

function getCellStyle(row: number, col: number) {
  if (isRedHome(row, col)) return { backgroundColor: COLORS.red };
  if (isGreenHome(row, col)) return { backgroundColor: COLORS.green };
  if (isBlueHome(row, col)) return { backgroundColor: COLORS.blue };
  if (isYellowHome(row, col)) return { backgroundColor: COLORS.yellow };

  if (
    isTopMiddlePath(row, col) ||
    isBottomMiddlePath(row, col) ||
    isLeftMiddlePath(row, col) ||
    isRightMiddlePath(row, col)
  ) {
    return { backgroundColor: COLORS.white };
  }

  return { backgroundColor: COLORS.white };
}

function renderHomeTokens(color: string) {
  return (
    <View style={styles.homeInner}>
      <View style={styles.tokenRow}>
        <View style={[styles.homeToken, { backgroundColor: color }]} />
      </View>
      <View style={styles.tokenRow}>
        <View style={[styles.homeToken, { backgroundColor: color }]} />
        <View style={[styles.homeToken, { backgroundColor: color }]} />
      </View>
      <View style={styles.tokenRow}>
        <View style={[styles.homeToken, { backgroundColor: color }]} />
      </View>
    </View>
  );
}

export default function LudoBoard({
  players,
  currentPlayer,
  movableTokenIds,
  onTokenPress,
}: Props) {
  const allTokens = useMemo(
    () => Object.values(players).flatMap(player => player.tokens),
    [players],
  );

  return (
    <View style={[styles.board, { width: boardSize, height: boardSize }]}>
      {Array.from({ length: GRID_SIZE }).map((_, row) =>
        Array.from({ length: GRID_SIZE }).map((__, col) => {
          const baseStyle = getCellStyle(row, col);
          const extraStyle: any = {};

          if (isGreenLane(row, col)) extraStyle.backgroundColor = COLORS.green;
          if (isBlueLane(row, col)) extraStyle.backgroundColor = COLORS.blue;
          if (isRedLane(row, col)) extraStyle.backgroundColor = COLORS.red;
          if (isYellowLane(row, col)) extraStyle.backgroundColor = COLORS.yellow;

          const commonIndex = COMMON_PATH.findIndex(
            pos => pos.row === row && pos.col === col,
          );
          const isSafe = SAFE_STEPS.includes(commonIndex);

          return (
            <View
              key={`${row}-${col}`}
              style={[
                styles.cell,
                baseStyle,
                extraStyle,
                { width: cellSize, height: cellSize },
              ]}
            >
              {isSafe ? <View style={styles.safeDot} /> : null}
              {redStartArrow(row, col) && <Text style={[styles.arrow, { color: COLORS.red }]}>▶</Text>}
              {greenStartArrow(row, col) && <Text style={[styles.arrow, { color: COLORS.green }]}>▼</Text>}
              {yellowStartArrow(row, col) && <Text style={[styles.arrow, { color: COLORS.yellow }]}>◀</Text>}
              {blueStartArrow(row, col) && <Text style={[styles.arrow, { color: COLORS.blue }]}>▲</Text>}
            </View>
          );
        }),
      )}

      <View style={styles.redHome}>{renderHomeTokens('#B91C1C')}</View>
      <View style={styles.greenHome}>{renderHomeTokens('#059669')}</View>
      <View style={styles.blueHome}>{renderHomeTokens('#0284C7')}</View>
      <View style={styles.yellowHome}>{renderHomeTokens('#F59E0B')}</View>

      <View style={styles.centerWrap}>
        <View style={styles.centerBox}>
          <View style={styles.triangleTop} />
          <View style={styles.triangleRight} />
          <View style={styles.triangleBottom} />
          <View style={styles.triangleLeft} />
        </View>
      </View>

      {allTokens.map(token => {
        if (token.isFinished) return null;

        const pos = getTokenBoardPosition(token);

        const sameCellTokens = allTokens.filter(other => {
          if (other.isFinished) return false;
          return areSameCell(getTokenBoardPosition(other), pos);
        });

        const tokenIndex = sameCellTokens.findIndex(item => item.id === token.id);
        const offsetX = (tokenIndex % 2) * 8 - 4;
        const offsetY = Math.floor(tokenIndex / 2) * 8 - 4;

        const isMovable = movableTokenIds.includes(token.id);
        const isActivePlayer = currentPlayer === token.player;

        return (
          <Pressable
            key={token.id}
            onPress={() => onTokenPress(token.id)}
            style={[
              styles.tokenWrap,
              {
                left: pos.col * cellSize + cellSize / 2 - 10 + offsetX,
                top: pos.row * cellSize + cellSize / 2 - 10 + offsetY,
                opacity: isActivePlayer ? 1 : 0.92,
              },
            ]}
          >
            {isMovable ? (
              <View
                style={[
                  styles.tokenGlow,
                  { borderColor: PLAYER_THEME[token.player] },
                ]}
              />
            ) : null}
            <Token color={token.player} size={20} active={isMovable} />
          </Pressable>
        );
      })}
    </View>
  );
}

const homeSize = cellSize * 6;
const centerSize = cellSize * 3;

const styles = StyleSheet.create({
  board: {
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: COLORS.border,
    borderWidth: 2,
    borderColor: COLORS.border,
    position: 'relative',
  },
  cell: {
    borderWidth: 0.8,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 16,
    fontWeight: '900',
  },
  safeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#64748B',
  },

  redHome: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: homeSize,
    height: homeSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenHome: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: homeSize,
    height: homeSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueHome: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: homeSize,
    height: homeSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yellowHome: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: homeSize,
    height: homeSize,
    alignItems: 'center',
    justifyContent: 'center',
  },

  homeInner: {
    width: '72%',
    height: '72%',
    backgroundColor: COLORS.white,
    borderRadius: 28,
    transform: [{ rotate: '45deg' }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenRow: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 8,
    transform: [{ rotate: '-45deg' }],
  },
  homeToken: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },

  centerWrap: {
    position: 'absolute',
    top: homeSize,
    left: homeSize,
    width: centerSize,
    height: centerSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerBox: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  triangleTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginHorizontal: 'auto',
    width: 0,
    height: 0,
    borderLeftWidth: centerSize / 2,
    borderRightWidth: centerSize / 2,
    borderBottomWidth: centerSize / 2,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: COLORS.green,
  },
  triangleRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    marginVertical: 'auto',
    width: 0,
    height: 0,
    borderTopWidth: centerSize / 2,
    borderBottomWidth: centerSize / 2,
    borderLeftWidth: centerSize / 2,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: COLORS.yellow,
  },
  triangleBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 'auto',
    width: 0,
    height: 0,
    borderLeftWidth: centerSize / 2,
    borderRightWidth: centerSize / 2,
    borderTopWidth: centerSize / 2,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.blue,
  },
  triangleLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    marginVertical: 'auto',
    width: 0,
    height: 0,
    borderTopWidth: centerSize / 2,
    borderBottomWidth: centerSize / 2,
    borderRightWidth: centerSize / 2,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: COLORS.red,
  },

  tokenWrap: {
    position: 'absolute',
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenGlow: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
  },
});