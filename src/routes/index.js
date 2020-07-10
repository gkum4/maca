import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Entypo } from '@expo/vector-icons';

import HomeStack from './HomeStack';
import DietaStack from './DietaStack';

const Tab = createBottomTabNavigator();

const Routes = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: "#F30158",
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack} 
        options={{
          tabBarIcon: ({ color }) => <Entypo name="home" size={25} color={color}/>,
        }}
      />
      <Tab.Screen 
        name="Dieta" 
        component={DietaStack} 
        options={{
          tabBarIcon: ({ color }) => <Entypo name="calendar" size={25} color={color}/>,
        }}
      />
    </Tab.Navigator>
  );
}

export default Routes;