import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CAR_COLORS } from '../constants';

type Props = {
  onLeft: () => void;
  onRight: () => void;
  onBoost: () => void;
};

export default function ControlPad({ onLeft, onRight ,onBoost}: Props) {
  return (
    <View style={styles.row}>
      <Pressable style={styles.btn} onPress={onLeft}>
        <Text style={styles.icon}>←</Text>
      </Pressable>

      <Pressable style={styles.boost} onPress={onBoost}>
        <Text style={styles.boostText}>BOOST</Text>
      </Pressable>

      <Pressable style={styles.btn} onPress={onRight}>
        <Text style={styles.icon}>→</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
  },
  btn: {
    flex: 1,
    height: 62,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
  },
  boost: {
    width: 90,
    height: 62,
    borderRadius: 22,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boostText: {
    color: '#1F2937',
    fontWeight: '900',
    fontSize: 13,
  },
});