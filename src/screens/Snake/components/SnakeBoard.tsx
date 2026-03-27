import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { GRID_SIZE } from '../constants';
import { Point } from '../types';

type Props = {
  snake: Point[];
  food: Point;
};

const screenWidth = Dimensions.get('window').width;
const boardSize = Math.min(screenWidth - 56, 320);
const cellSize = boardSize / GRID_SIZE;

export default function SnakeBoard({ snake, food }: Props) {
  return (
    <View style={[styles.board, { width: boardSize, height: boardSize }]}>
      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
        <View
          key={index}
          style={[styles.gridCell, { width: cellSize, height: cellSize }]}
        />
      ))}

      <View
        style={[
          styles.food,
          {
            width: cellSize,
            height: cellSize,
            left: food.x * cellSize,
            top: food.y * cellSize,
          },
        ]}
      />

      {snake.map((item, index) => {
        const isHead = index === 0;

        return (
          <View
            key={`${item.x}-${item.y}-${index}`}
            style={[
              styles.snakePart,
              {
                width: cellSize,
                height: cellSize,
                left: item.x * cellSize,
                top: item.y * cellSize,
                backgroundColor: isHead ? COLORS.snakeHead : COLORS.snakeBody,
                borderRadius: isHead ? 8 : 6,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'relative',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#0A1424',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  gridCell: {
    borderWidth: 0.4,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  food: {
    position: 'absolute',
    backgroundColor: COLORS.food,
    borderRadius: 999,
  },
  snakePart: {
    position: 'absolute',
  },
});