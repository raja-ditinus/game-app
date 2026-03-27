import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../constants';

type Props = {
  x: number;
  y: number;
  radius: number;
  flash?: boolean;
};

export default function Target({ x, y, radius, flash = false }: Props) {
  return (
    <View
      style={[
        styles.wrap,
        {
          left: x - radius,
          top: y - radius,
          width: radius * 2,
          height: radius * 2,
          borderRadius: radius,
          opacity: flash ? 0.8 : 1,
          transform: [{ scale: flash ? 1.05 : 1 }],
        },
      ]}
    >
      <View style={[styles.ringOuter, { borderRadius: radius }]}>
        <View style={[styles.ringMid, { width: radius * 1.45, height: radius * 1.45, borderRadius: radius * 0.725 }]}>
          <View style={[styles.ringInner, { width: radius * 0.9, height: radius * 0.9, borderRadius: radius * 0.45 }]}>
            <View style={[styles.bullseye, { width: radius * 0.34, height: radius * 0.34, borderRadius: radius * 0.17 }]} />
          </View>
        </View>
      </View>
      <View style={styles.stand} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringOuter: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.targetBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  ringMid: {
    backgroundColor: COLORS.targetCream,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  ringInner: {
    backgroundColor: COLORS.targetRed,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  bullseye: {
    backgroundColor: COLORS.targetCream,
  },
  stand: {
    position: 'absolute',
    bottom: -40,
    width: 6,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#7C5A3B',
  },
});