import React from 'react';

import { Platform, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { FrutasProvider } from './src/hooks/frutas';

import Routes from './src/routes';

const App = () => {
  return (
      <>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer>
          <FrutasProvider>
            <Routes />
          </FrutasProvider>
        </NavigationContainer>
      </>
  );
};

export default App;