import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../constants/colors';

type Props = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
};

export default function AppButton({ title, onPress, style }: Props) {
  return (
    <Pressable onPress={onPress} style={style}>
      <LinearGradient colors={['#38BDF8', '#22C55E']} style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#03111D',
    fontWeight: '800',
    fontSize: 15,
  },
});