import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, PLAYER_THEME } from '../constants';
import { PlayerColor } from '../types';
import Token from './Token';

type Props = {
  color: PlayerColor;
  isActive?: boolean;
  finishedCount?: number;
};

export default function PlayerPanel({
  color,
  isActive = false,
  finishedCount = 0,
}: Props) {
  return (
    <View
      style={[
        styles.panel,
        {
          borderColor: PLAYER_THEME[color],
          backgroundColor: isActive ? 'rgba(255,255,255,0.14)' : COLORS.panel,
        },
      ]}
    >
      <View style={styles.left}>
        <Token color={color} size={16} active={isActive} />
        <Text style={styles.name}>{color.toUpperCase()}</Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.count}>Done: {finishedCount}</Text>
        {isActive ? <Text style={styles.turn}>TURN</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    minWidth: 150,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    alignItems: 'flex-end',
  },
  name: {
    marginLeft: 8,
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '800',
  },
  count: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '700',
  },
  turn: {
    marginTop: 2,
    color: COLORS.text,
    fontSize: 11,
    fontWeight: '900',
  },
});