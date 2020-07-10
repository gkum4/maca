import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dieta from '../pages/Dieta';

const Stack = createStackNavigator();

const DietaStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dieta"
      screenOptions={{
        cardStyle: {
          backgroundColor: '#F5EEE4',
        }
      }}
    >
      <Stack.Screen name="Dieta" component={Dieta} />
    </Stack.Navigator>
  );
}

export default DietaStack;