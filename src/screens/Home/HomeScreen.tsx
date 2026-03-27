import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import Container from '../../components/layout/Container';
import Header from '../../components/common/Header';
import GameCard from '../../components/common/GameCard';
import { RootStackParamList } from '../../navigation/types';
import { ROUTES } from '../../navigation/routes';
import { COLORS } from '../../constants/colors';
import SpaceShipIcon from '../../assets/icons/SpaceShipIcon';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <ScreenWrapper>
      <Container>
        <Header title="GameZone" subtitle="Play beautiful mini games with smooth UI" />

        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Welcome Back 👋</Text>
          <Text style={styles.heroText}>
            Start with Snake game first. Later you can add Ludo, Quiz, Tic Tac Toe, and more.
          </Text>
        </View>
        <ScrollView>
          <View style={{ marginTop: 20 }}>
            <GameCard
              title="Snake Game"
              subtitle="Advanced UI, swipe controls, score, pause and restart"
              emoji="🐍"
              onPress={() => navigation.navigate(ROUTES.SNAKE)}
            />

            {/* <GameCard
            title="Ludo Game"
            subtitle="Coming soon"
            emoji="🎲"
            onPress={() => navigation.navigate(ROUTES.LUDO)}
          /> */}
            <GameCard
              title="Tic Tac Toe"
              subtitle="Advanced board with score, restart and winner modal"
              emoji="❌"
              onPress={() => navigation.navigate(ROUTES.TICTACTOE)}
            />
            <GameCard
              title="Car Racing"
              subtitle="Advanced endless racing arcade"
              emoji="🏎️"
              onPress={() => navigation.navigate(ROUTES.CARRACING)}
            />
            <GameCard
              title="Brick Breaker"
              subtitle="Classic arcade brick smash game"
              emoji="🧱"
              onPress={() => navigation.navigate(ROUTES.BRICKBREAKER)}
            />
            <GameCard
              title="Memory Game"
              subtitle="Flip cards and match all pairs"
              emoji="🧠"
              onPress={() => navigation.navigate(ROUTES.MEMORY)}
            />
            <GameCard
              title="Fruit Slice"
              subtitle="Swipe fruits, avoid bombs, chase combos"
              emoji="🍉"
              onPress={() => navigation.navigate(ROUTES.FRUITSLICE)}
            />
            <GameCard
              title="Archery Master"
              subtitle="Aim, pull, and hit the moving target"
              emoji="🎯"
              onPress={() => navigation.navigate(ROUTES.ARCHERY)}
            />
            <GameCard
              title="Space Shooter"
              subtitle="Destroy enemies and survive the attack"
              icon={<SpaceShipIcon size={28} />}
              onPress={() => navigation.navigate(ROUTES.SPACESHOOTER)}
            />
          </View>
        </ScrollView>
      </Container>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    marginTop: 4,
    padding: 18,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  heroTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '800',
  },
  heroText: {
    color: COLORS.muted,
    fontSize: 14,
    marginTop: 8,
    lineHeight: 22,
  },
});