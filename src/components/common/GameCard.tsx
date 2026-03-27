import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../constants/colors';

type Props = {
  title: string;
  subtitle: string;
  emoji?: string;
  onPress: () => void;
};

export default function GameCard({ title, subtitle, emoji = '🎮', onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.05)']} style={styles.card}>
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>{emoji}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <Text style={styles.arrow}>→</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconWrap: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 26,
  },
  content: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '800',
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 4,
  },
  arrow: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '700',
  },
});