import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CellValue } from '../types';
import Cell from './Cell';

type Props = {
  board: CellValue[];
  winningLine: number[];
  onCellPress: (index: number) => void;
};

export default function Board({
  board,
  winningLine,
  onCellPress,
}: Props) {
  return (
    <View style={styles.board}>
      {board.map((item, index) => (
        <Cell
          key={index}
          value={item}
          onPress={() => onCellPress(index)}
          isWinningCell={winningLine.includes(index)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
});