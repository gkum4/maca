import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { EvilIcons } from '@expo/vector-icons';

import Home from '../pages/Home';
import Configuracao from '../pages/Configuracao';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        cardStyle: {
          backgroundColor: '#F5EEE4',
        }
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={Home} 
      />
      <Stack.Screen 
        name="Configuracao" 
        component={Configuracao} 
        options={{ headerTitle: "Configurações" }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;