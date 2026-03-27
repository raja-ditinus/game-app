import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SCREEN_WIDTH } from '../constants';

export default function Background() {
  const [cloudOffset1, setCloudOffset1] = useState(0);
  const [cloudOffset2, setCloudOffset2] = useState(0);

  const loopRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    loopRef.current = setInterval(() => {
      setCloudOffset1(prev => (prev <= -SCREEN_WIDTH ? 0 : prev - 0.6));
      setCloudOffset2(prev => (prev <= -SCREEN_WIDTH ? 0 : prev - 1.1));
    }, 16);

    return () => {
      if (loopRef.current) clearInterval(loopRef.current);
    };
  }, []);

  return (
    <LinearGradient colors={['#6ED7E5', '#9EE7F0']} style={styles.container}>
      <View style={[styles.cloud, { top: 70, left: 40 + cloudOffset1 }]} />
      <View style={[styles.cloudLarge, { top: 120, left: 220 + cloudOffset1 }]} />

      <View style={[styles.cloud, { top: 95, left: 120 + cloudOffset2 }]} />
      <View style={[styles.cloudLarge, { top: 160, left: 320 + cloudOffset2 }]} />

      <View style={styles.city} />
      <View style={styles.hillBack} />
      <View style={styles.hillFront} />

      <View style={styles.groundTop} />
      <View style={styles.ground} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  cloud: {
    position: 'absolute',
    width: 80,
    height: 28,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    opacity: 0.95,
  },
  cloudLarge: {
    position: 'absolute',
    width: 110,
    height: 34,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    opacity: 0.9,
  },
  city: {
    position: 'absolute',
    bottom: 118,
    left: 20,
    right: 20,
    height: 28,
    backgroundColor: 'rgba(120,160,170,0.18)',
    borderRadius: 8,
  },
  hillBack: {
    position: 'absolute',
    bottom: 94,
    left: -20,
    right: -20,
    height: 50,
    backgroundColor: '#B6EE9D',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
  hillFront: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: -30,
    height: 36,
    backgroundColor: '#8FE07E',
    borderTopLeftRadius: 70,
    borderTopRightRadius: 100,
  },
  groundTop: {
    position: 'absolute',
    bottom: 64,
    left: 0,
    right: 0,
    height: 16,
    backgroundColor: '#A2D85E',
    borderTopWidth: 2,
    borderTopColor: '#78B631',
  },
  ground: {
    position: 'absolute',
    bottom: 0,
    height: 64,
    width: '100%',
    backgroundColor: '#D8CF96',
  },
});