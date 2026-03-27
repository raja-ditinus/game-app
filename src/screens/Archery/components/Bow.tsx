import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BOW_X, BOW_Y, COLORS } from '../constants';

export default function Bow() {
  return (
    <View style={[styles.wrap, { left: BOW_X, top: BOW_Y }]}>
      <View style={styles.arc} />
      <View style={styles.string} />
      <View style={styles.handle} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    width: 38,
    height: 90,
  },
  arc: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 28,
    height: 90,
    borderTopLeftRadius: 45,
    borderBottomLeftRadius: 45,
    borderWidth: 5,
    borderRightWidth: 0,
    borderColor: COLORS.bow,
  },
  string: {
    position: 'absolute',
    right: 8,
    top: 4,
    width: 2,
    height: 82,
    backgroundColor: '#E5E7EB',
  },
  handle: {
    position: 'absolute',
    left: 8,
    top: 34,
    width: 12,
    height: 22,
    borderRadius: 6,
    backgroundColor: '#5B3716',
  },
});