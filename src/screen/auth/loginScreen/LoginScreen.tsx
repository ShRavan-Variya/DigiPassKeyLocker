import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RNToasty} from 'react-native-toasty';
import {TextDecoder} from 'text-encoding';
import bs58 from 'bs58';
import {getUserDataByEmail} from 'store/DBOperations';
import {AuthHeader} from '@app/components/AuthHeader';
import {useGlobal} from '@app/contexts/GlobalContext';
import {Constants, Validations} from '@app/constants';
import {AppConstants, cacheData} from '@app/module';
import {InputText} from '@app/components/InputText';
import {ButtonFill} from '@app/components/Button';
import {Loader} from '@app/components/Loader';
import Theme from '@app/theme/Theme';
import styles from './styles';

const LoginScreen = (props: any) => {
  // All States
  const globalContext = useGlobal();
  const [loading, setLoading] = useState(false);
  const [isSecure, setIsSecure] = useState<boolean>(true);
  // Main
  const [textEmail, setTextEmail] = useState<string>('');
  const [textPassword, setTextPassword] = useState<string>('');
  // Error
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');

  const isAllValid = () => {
    let isValid = true;

    setErrorEmail('');
    setErrorPassword('');

    if (!Validations.isValidEmail(textEmail)) {
      isValid = false;
      setErrorEmail('Please enter valid email or username!');
    } else if (!Validations.isValidPassword(textPassword)) {
      isValid = false;
      setErrorPassword(
        'Password must be atleast 8 character long with 1 capital, 1 small, 1 number and 1 special character',
      );
    }

    return isValid;
  };

  const doLogin = async () => {
    try {
      const resUserData: any = await getUserDataByEmail(globalContext.realm, textEmail);
      if (resUserData && resUserData.success) {
        const userDataMain = resUserData.data;

        const decodedUint8Array = bs58.decode(userDataMain.token);
        const decodedString = new TextDecoder().decode(decodedUint8Array);
        const decodedObject = JSON.parse(decodedString);

        if (textEmail === decodedObject.email && textPassword === decodedObject.password) {          
          const asyncItem = AppConstants.AsyncKeyLiterals;
          cacheData.saveDataToCachedWithKey(asyncItem.isLoggedIn, true);
          cacheData.saveDataToCachedWithKey(asyncItem.userData, userDataMain);
          cacheData.saveDataToCachedWithKey(asyncItem.loginUserId, userDataMain.userId);
          globalContext.setLogin(true)
          globalContext.setLoginUserData(userDataMain)
          globalContext.setMainUserId(userDataMain.userId)

          props.navigation.reset({
            index: 0,
            routes: [{name: Constants.SCREEN_STACK_NAVIGATION}],
          });
        } else {
          RNToasty.Show({title: 'Invalid credentials!'});
        }
      } else {
        console.log('resUserData :: ', resUserData);
        const message = resUserData.message;
        RNToasty.Show({title: message});
      }
    } catch (error: any) {
      setLoading(false);
      RNToasty.Show({title: 'No user found!'});
    }
  };

  return (
    <>
      <StatusBar
        backgroundColor={Theme.colors.bgColor1}
        barStyle={'light-content'}
      />
      <SafeAreaView style={styles.mainContainerStyle}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={styles.viewFlexContainer}
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}>
          <AuthHeader title={'Welcome back!'} />
          <InputText
            title={'Email'}
            value={textEmail}
            placeholder={'Email'}
            viewHolderStyle={styles.marginV5}
            onChangeText={setTextEmail}
            autoCapitalize={'none'}
            error={errorEmail}
          />
          <InputText
            title={'Password'}
            value={textPassword}
            placeholder={'Password'}
            viewHolderStyle={styles.marginV5}
            onChangeText={setTextPassword}
            isPassword={true}
            isSecure={isSecure}
            autoCapitalize={'none'}
            onChangeSecurity={() => {
              setIsSecure(!isSecure);
            }}
            error={errorPassword}
          />
        </KeyboardAwareScrollView>
        <View style={styles.buttonMargin}>
          <ButtonFill
            title={'Log In'.toUpperCase()}
            onClick={() => {
              if (isAllValid()) {
                doLogin()
              }
            }}
          />
          <Text style={styles.textAccount}>{'Don\'t have account? '}<Text style={styles.textSignUp} onPress={() => {
            props.navigation.navigate(Constants.REGISTER_SCREEN)
          }}>{'Sign Up'}</Text></Text>
        </View>
      </SafeAreaView>
      <Loader isLoading={loading} />
    </>
  );
};

export default LoginScreen;
