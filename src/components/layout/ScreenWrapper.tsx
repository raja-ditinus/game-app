import React, { ReactNode } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../constants/colors';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
};

export default function ScreenWrapper({ children }: Props) {
  const insets = useSafeAreaInsets(); // ✅ IMPORTANT

  return (
    <LinearGradient
      colors={[COLORS.background, COLORS.background2]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* 👇 THIS FIXES BOTTOM ISSUE */}
        <View style={[styles.content, { paddingBottom: insets.bottom + 10 }]}>
          {children}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});