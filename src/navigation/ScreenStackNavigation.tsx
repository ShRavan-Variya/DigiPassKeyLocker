import React from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Constants} from '@app/constants';
import {DetailsScreen, EmptyScreen, HomeScreen} from '@app/screen';
import Theme from '@app/theme/Theme';

const Stack = createNativeStackNavigator();

const ScreenStackNavigation = () => {
  return (
    <>
      <StatusBar
        backgroundColor={Theme.colors.appColor}
        barStyle={'light-content'}
      />
      <Stack.Navigator
        initialRouteName={Constants.HOME_SCREEN}
        screenOptions={({navigation, route}) => ({})}>
        <Stack.Screen
          name={Constants.DETAILS_SCREEN}
          component={DetailsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Constants.EMPTY_SCREEN}
          component={EmptyScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Constants.HOME_SCREEN}
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default ScreenStackNavigation;
