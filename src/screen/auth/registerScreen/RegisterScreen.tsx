import React, {useState} from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextEncoder, TextDecoder} from 'text-encoding';
import {RNToasty} from 'react-native-toasty';
import bs58 from 'bs58';
import {getUserDataByEmail, storeUserData} from '@app/store/DBOperations';
import {AuthHeader} from '@app/components/AuthHeader';
import {useGlobal} from '@app/contexts/GlobalContext';
import {Constants, Validations} from '@app/constants';
import {AppConstants, cacheData} from '@app/module';
import {InputText} from '@app/components/InputText';
import {ButtonFill} from '@app/components/Button';
import {Loader} from '@app/components/Loader';
import Theme from '@app/theme/Theme';
import styles from './styles';

const RegisterScreen = (props: any) => {
  // All States
  const globalContext = useGlobal();
  const [loading, setLoading] = useState(false);
  const [isSecure, setIsSecure] = useState<boolean>(true);
  const [isSecureConfirm, setIsSecureConfirm] = useState<boolean>(true);
  // Main
  const [textFirstName, setTextFirstName] = useState<string>('');
  const [textLastName, setTextLastName] = useState<string>('');
  const [textEmail, setTextEmail] = useState<string>('');
  const [textPassword, setTextPassword] = useState<string>('');
  const [textConfirmPassword, setTextConfirmPassword] = useState<string>('');
  // Error
  const [errorName, setErrorName] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>('');

  const isAllValid = () => {
    let isValid = true;

    setErrorName('');
    setErrorEmail('');
    setErrorPassword('');
    setErrorConfirmPassword('');

    if (textFirstName.trim().length === 0 || textLastName.trim().length === 0) {
      isValid = false;
      setErrorName('Please enter valid name!');
    } else if (!Validations.isValidEmail(textEmail)) {
      isValid = false;
      setErrorEmail('Please enter valid email or username!');
    } else if (!Validations.isValidPassword(textPassword)) {
      isValid = false;
      setErrorPassword(
        'Password must be atleast 8 character long with 1 capital, 1 small, 1 number and 1 special character',
      );
    } else if (textPassword !== textConfirmPassword) {
      isValid = false;
      setErrorPassword('Password does not match');
    }

    return isValid;
  };

  const doCheckEmail = async () => {
    try {
      const resUserData: any = await getUserDataByEmail(globalContext.realm, textEmail);
      if (resUserData && resUserData.success) {
        const userDataMain = resUserData.data;
        if (userDataMain.email === textEmail) {
          RNToasty.Show({title: 'Email already exists!'})
        } else {
          doAddUserToDB()
        }
      } else {
        doAddUserToDB()
      }
    } catch (error: any) {
      doAddUserToDB()
    }
  }

  const doAddUserToDB = async () => {
    const data = {
      firstName: textFirstName,
      lastName: textLastName,
      email: textEmail,
      password: textPassword,
    }

    const jsonString = JSON.stringify(data);
    const uint8Array = new TextEncoder().encode(jsonString);
    const encodedString = bs58.encode(uint8Array);

    const finalData = {
      firstName: textFirstName,
      lastName: textLastName,
      email: textEmail,
      token: encodedString,
    }
    
    const resStoreData: any = await storeUserData(globalContext.realm, finalData);
    if (resStoreData.success) {
      const asyncItem = AppConstants.AsyncKeyLiterals;
      cacheData.saveDataToCachedWithKey(asyncItem.isLoggedIn, true);
      cacheData.saveDataToCachedWithKey(asyncItem.userData, finalData);
      cacheData.saveDataToCachedWithKey(asyncItem.loginUserId, resStoreData.userId);
      globalContext.setLogin(true)
      globalContext.setLoginUserData(finalData)
      globalContext.setMainUserId(resStoreData.userId)

      setTimeout(() => {
        props.navigation.reset({
          index: 0,
          routes: [{name: Constants.SCREEN_STACK_NAVIGATION}],
        });
      }, 450);
    }
  }

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
          <AuthHeader title={'Register'} />
          <View style={styles.viewRow}>
            <View style={styles.viewLeft}>
              <InputText
                title={'First Name'}
                value={textFirstName}
                placeholder={'First Name'}
                viewHolderStyle={styles.marginV5}
                onChangeText={setTextFirstName}
                autoCapitalize={'none'}
              />
            </View>
            <View style={styles.viewRight}>
              <InputText
                title={'Last Name'}
                value={textLastName}
                placeholder={'Last Name'}
                viewHolderStyle={styles.marginV5}
                onChangeText={setTextLastName}
                autoCapitalize={'none'}
              />
            </View>
          </View>
          {errorName !== '' ? (
            <Text style={styles.textError}>{errorName}</Text>
          ) : null}
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
          <InputText
            title={'Confirm Password'}
            value={textConfirmPassword}
            placeholder={'Confirm Password'}
            viewHolderStyle={styles.marginV5}
            onChangeText={setTextConfirmPassword}
            isPassword={true}
            isSecure={isSecureConfirm}
            autoCapitalize={'none'}
            onChangeSecurity={() => {
              setIsSecureConfirm(!isSecureConfirm);
            }}
            error={errorConfirmPassword}
          />
        </KeyboardAwareScrollView>
        <View style={styles.buttonMargin}>
          <ButtonFill
            title={'Sign Up'.toUpperCase()}
            onClick={() => {
              if (isAllValid()) {
                doCheckEmail();
              }
            }}
          />
          <Text style={styles.textAccount}>
            {'Already have account? '}
            <Text
              style={styles.textSignUp}
              onPress={() => {
                props.navigation.goBack();
              }}>
              {'Log In'}
            </Text>
          </Text>
        </View>
      </SafeAreaView>
      <Loader isLoading={loading} />
    </>
  );
};

export default RegisterScreen;
