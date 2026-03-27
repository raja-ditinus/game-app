import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BrickType } from '../types';

type Props = {
  brick: BrickType;
};

export default function Brick({ brick }: Props) {
  if (!brick.visible) return null;

  return (
    <View
      style={[
        styles.brick,
        {
          left: brick.x,
          top: brick.y,
          width: brick.width,
          height: brick.height,
          backgroundColor: brick.color,
          opacity: brick.hitsLeft === 2 ? 0.75 : 1,
        },
      ]}
    >
      {brick.hitsLeft > 1 ? <Text style={styles.hitText}>{brick.hitsLeft}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  brick: {
    position: 'absolute',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hitText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 12,
  },
});