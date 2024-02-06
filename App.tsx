import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigation from '@app/navigation/AuthStackNavigation';
import {GlobalProvider} from '@app/contexts/GlobalContext';
import {getRealmInstance} from '@app/store/realm';

const App = () => {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <GlobalProvider realmInstance={getRealmInstance()}>
          <NavigationContainer>
            <AuthStackNavigation />
          </NavigationContainer>
        </GlobalProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
