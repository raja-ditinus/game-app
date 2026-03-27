import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SCREEN_HEIGHT, THEME } from '../constants';
import { FruitType, SlashPoint } from '../types';
import FruitItem from './FruitItem';

type Props = {
  fruits: FruitType[];
  slashTrail: SlashPoint[];
};

export default function GameCanvas({ fruits, slashTrail }: Props) {
  return (
    <LinearGradient
      colors={[THEME.bgTop, THEME.bgBottom]}
      style={styles.canvas}
    >
      {fruits.map(fruit => (
        <FruitItem key={fruit.id} fruit={fruit} />
      ))}

      {slashTrail.map((point, index) => (
        <View
          key={`${point.x}-${point.y}-${index}`}
          style={[
            styles.trail,
            {
              left: point.x - 6,
              top: point.y - 6,
              opacity: Math.max(0.2, 1 - index * 0.08),
            },
          ]}
        />
      ))}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  canvas: {
    height: SCREEN_HEIGHT * 0.68,
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: THEME.border,
    position: 'relative',
  },
  trail: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: THEME.trail,
  },
});