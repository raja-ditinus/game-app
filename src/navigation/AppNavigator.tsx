import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import SnakeScreen from '../screens/Snake/SnakeScreen';
import { RootStackParamList } from './types';
import { ROUTES } from './routes';
import LudoScreen from '../screens/Ludo/LudoScreen';
import TicTacToeScreen from '../screens/TicTacToe/TicTacToeScreen';
import CarRacingScreen from '../screens/CarRacing/CarRacingScreen';
import BrickBreakerScreen from '../screens/BrickBreaker/BrickBreakerScreen';
import MemoryScreen from '../screens/Memory/MemoryScreen';
import FruitSliceScreen from '../screens/FruitSlice/FruitSliceScreen';
import ArcheryScreen from '../screens/Archery/ArcheryScreen';
import SpaceShooterScreen from '../screens/SpaceShooter/SpaceShooterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Stack.Screen name={ROUTES.SNAKE} component={SnakeScreen} />
      <Stack.Screen name={ROUTES.LUDO} component={LudoScreen} />
      <Stack.Screen name={ROUTES.TICTACTOE} component={TicTacToeScreen} />
      <Stack.Screen name={ROUTES.CARRACING} component={CarRacingScreen} />
      <Stack.Screen name={ROUTES.BRICKBREAKER} component={BrickBreakerScreen} />
      <Stack.Screen name={ROUTES.MEMORY} component={MemoryScreen} />
      <Stack.Screen name={ROUTES.FRUITSLICE} component={FruitSliceScreen} />
      <Stack.Screen name={ROUTES.ARCHERY} component={ArcheryScreen} />
       <Stack.Screen name={ROUTES.SPACESHOOTER} component={SpaceShooterScreen} />
    </Stack.Navigator>
  );
}