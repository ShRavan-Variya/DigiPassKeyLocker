import React, {useEffect} from 'react';
import {Image, SafeAreaView, StatusBar} from 'react-native';
import {useGlobal} from '@app/contexts/GlobalContext';
import {AppConstants, cacheData} from '@app/module';
import {Constants} from '@app/constants';
import {saveToken} from '@app/api';
import styles from './styles';
import Theme from 'theme/Theme';

const SplashScreen = (props: any) => {
  // All States
  const globalContext = useGlobal();

  useEffect(() => {
    setTimeout(async () => {
      const asyncData = AppConstants.AsyncKeyLiterals
      try {
        const isLoggedIn = await cacheData.getDataFromCachedWithKey(asyncData.isLoggedIn);
        if (isLoggedIn) {
          const userData: any = await cacheData.getDataFromCachedWithKey(asyncData.userData);
          if (userData && userData !== undefined && userData !== null) {
            const loginUserId: any = await cacheData.getDataFromCachedWithKey(asyncData.loginUserId);
            if (loginUserId && loginUserId !== undefined && loginUserId !== null) {
              globalContext.setLogin(true)
              globalContext.setLoginUserData(userData)
              globalContext.setMainUserId(loginUserId)
              
              setTimeout(() => {
                props.navigation.reset({
                  index: 0,
                  routes: [{name: Constants.SCREEN_STACK_NAVIGATION}],
                });
              }, 450);
            } else {
              throw new Error('No user id!');
            }
          } else {
            throw new Error('No user data!');
          }
        } else {
          throw new Error("User isn't logged in");
        }
      } catch (err) {
        props.navigation.reset({
          index: 0,
          routes: [{name: Constants.LOGIN_SCREEN}],
        });
      }
    }, 2000);
  }, []);

  return (
    <>
      <StatusBar hidden />
      <SafeAreaView style={styles.mainContainerStyle}>
        <Image source={Theme.icons.icIcon} resizeMode={'contain'} style={styles.imageMain} />
      </SafeAreaView>
    </>
  );
};

export default SplashScreen;
