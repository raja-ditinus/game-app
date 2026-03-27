import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  y: number;
  rotation: number;
  isStarted: boolean;
};

export default function Bird({ y, rotation, isStarted }: Props) {
  const [wingUp, setWingUp] = useState(true);
  const loopRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    loopRef.current = setInterval(() => {
      setWingUp(prev => !prev);
    }, isStarted ? 120 : 220);

    return () => {
      if (loopRef.current) clearInterval(loopRef.current);
    };
  }, [isStarted]);

  return (
    <View
      style={[
        styles.birdWrap,
        {
          top: y,
          transform: [{ rotate: `${rotation}deg` }],
        },
      ]}
    >
      <View style={styles.body} />
      <View style={[styles.wing, wingUp ? styles.wingUp : styles.wingDown]} />
      <View style={styles.eye} />
      <View style={styles.pupil} />
      <View style={styles.beak} />
    </View>
  );
}

const styles = StyleSheet.create({
  birdWrap: {
    position: 'absolute',
    left: 120,
    width: 34,
    height: 28,
  },
  body: {
    position: 'absolute',
    width: 30,
    height: 24,
    backgroundColor: '#FFD44D',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
  },
  wing: {
    position: 'absolute',
    left: 5,
    top: 8,
    width: 13,
    height: 10,
    borderRadius: 8,
    backgroundColor: '#FF9F1A',
  },
  wingUp: {
    transform: [{ rotate: '-25deg' }, { translateY: -2 }],
  },
  wingDown: {
    transform: [{ rotate: '20deg' }, { translateY: 2 }],
  },
  eye: {
    position: 'absolute',
    right: 7,
    top: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  pupil: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#111827',
  },
  beak: {
    position: 'absolute',
    right: -6,
    top: 10,
    width: 0,
    height: 0,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#FF9F1A',
  },
});