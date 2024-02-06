import React from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen, RegisterScreen, SplashScreen} from '@app/screen';
import ScreenStackNavigation from './ScreenStackNavigation';
import {Constants} from '@app/constants';
import Theme from '@app/theme/Theme';

const Stack = createNativeStackNavigator();

const AuthStackNavigation = () => {
  return (
    <>
      <StatusBar
        backgroundColor={Theme.colors.appColor}
        barStyle={'light-content'}
      />
      <Stack.Navigator
        initialRouteName={Constants.SPLASH_SCREEN}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        screenOptions={({navigation, route}) => ({})}>
        <Stack.Screen
          name={Constants.LOGIN_SCREEN}
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Constants.REGISTER_SCREEN}
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Constants.SPLASH_SCREEN}
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Constants.SCREEN_STACK_NAVIGATION}
          component={ScreenStackNavigation}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default AuthStackNavigation;
