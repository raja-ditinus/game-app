import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FRUIT_EMOJI } from '../constants';
import { FruitType } from '../types';

type Props = {
  fruit: FruitType;
};

export default function FruitItem({ fruit }: Props) {
  return (
    <View
      style={[
        styles.item,
        {
          left: fruit.x - fruit.radius,
          top: fruit.y - fruit.radius,
          width: fruit.radius * 2,
          height: fruit.radius * 2,
          borderRadius: fruit.radius,
          transform: [{ rotate: `${fruit.rotation}deg` }],
        },
      ]}
    >
      <Text style={styles.emoji}>{FRUIT_EMOJI[fruit.kind]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 34,
  },
});