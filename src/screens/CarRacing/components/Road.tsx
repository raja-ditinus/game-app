import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  CAR_COLORS,
  ENEMY_CAR_HEIGHT,
  PLAYER_CAR_HEIGHT,
  ROAD_HEIGHT,
  ROAD_WIDTH,
} from '../constants';
import { EnemyCarType, Lane } from '../types';
import PlayerCar from './PlayerCar';
import EnemyCar from './EnemyCar';

type Props = {
  playerLane: Lane;
  enemies: EnemyCarType[];
};

const laneWidth = ROAD_WIDTH / 3;

export default function Road({ playerLane, enemies }: Props) {
  const playerLeft = playerLane * laneWidth + laneWidth / 2 - 26;

  return (
    <LinearGradient
      colors={['#0B1220', CAR_COLORS.road]}
      style={styles.roadWrap}
    >
      <View style={styles.road}>
        <View style={[styles.edgeGlow, styles.leftGlow]} />
        <View style={[styles.edgeGlow, styles.rightGlow]} />

        <View style={[styles.laneDivider, { left: laneWidth - 2 }]} />
        <View style={[styles.laneDivider, { left: laneWidth * 2 - 2 }]} />

        {Array.from({ length: 8 }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dash,
              {
                left: ROAD_WIDTH / 2 - 3,
                top: index * 70,
              },
            ]}
          />
        ))}

        {enemies.map(enemy => {
          const left = enemy.lane * laneWidth + laneWidth / 2 - 26;

          return (
            <View
              key={enemy.id}
              style={[
                styles.enemyWrap,
                {
                  left,
                  top: enemy.top,
                  height: ENEMY_CAR_HEIGHT,
                },
              ]}
            >
              <EnemyCar color={enemy.color} />
            </View>
          );
        })}

        <View
          style={[
            styles.playerWrap,
            {
              left: playerLeft,
              top: ROAD_HEIGHT - PLAYER_CAR_HEIGHT - 18,
            },
          ]}
        >
          <PlayerCar color={CAR_COLORS.player} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  roadWrap: {
    width: ROAD_WIDTH + 18,
    borderRadius: 30,
    padding: 9,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(56,189,248,0.25)',
  },
  road: {
    width: ROAD_WIDTH,
    height: ROAD_HEIGHT,
    backgroundColor: CAR_COLORS.road,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  edgeGlow: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: CAR_COLORS.roadEdge,
    opacity: 0.85,
  },
  leftGlow: {
    left: 0,
  },
  rightGlow: {
    right: 0,
  },
  laneDivider: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  dash: {
    position: 'absolute',
    width: 6,
    height: 34,
    borderRadius: 4,
    backgroundColor: CAR_COLORS.lane,
  },
  playerWrap: {
    position: 'absolute',
    width: 52,
    height: 92,
  },
  enemyWrap: {
    position: 'absolute',
    width: 52,
  },
});