import React, { useCallback, useEffect, useState } from 'react';
import {FlatList, Image, ListRenderItem, SafeAreaView, Text, View} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {RNToasty} from 'react-native-toasty';
import {getAccountListByUserId, storeAccountData} from '@app/store/DBOperations';
import {HeaderCommon} from '@app/components/HeaderCommon';
import {AccountItem} from '@app/components/AccountItem';
import {AddAccount} from '@app/components/CustomModals';
import {useGlobal} from '@app/contexts/GlobalContext';
import {AppConstants, cacheData} from '@app/module';
import {Constants} from '@app/constants';
import Theme from '@app/theme/Theme';
import styles from './styles';

interface Accounts {
  id: number;
  acName: string;
  accounts: number;
  userId: number;
}

const HomeScreen = (props: any) => {
  const globalContext = useGlobal();
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [textPlatformTitle, setTextPlatformTitle] = useState<string>('')
  const [textPlatformError, setTextPlatformError] = useState<string>('')
  const [listOfAccounts, setListOfAccounts] = useState<Accounts[]>([])

  useFocusEffect(
    useCallback(() => {
      doGetData()
    }, []),
  );
  
  const doGetData = async () => {
    try {      
      const resAccountData: any = await getAccountListByUserId(globalContext.realm, globalContext.userId);
      if (resAccountData && resAccountData.success) {
        const accountList = resAccountData.data;        
        setListOfAccounts(accountList)
      } else {
        console.log('resUserData :: ', resAccountData);
        const message = resAccountData.message;
        RNToasty.Show({title: message});
      }
    } catch (error: any) {
      RNToasty.Show({title: 'No data found!'});
    }
  }
  
  const isValidPlatform = () => {
    let valid = true;

    const newList = [...listOfAccounts];
    const alreadyHasAccount = newList.some(item => item.acName === textPlatformTitle);
    if (textPlatformTitle.trim().length === 0) {
      valid = false;
      setTextPlatformError('Please enter account name!')
    } else if (alreadyHasAccount) {
      valid = false;
      setTextPlatformError('Account already exists!')
    }

    return valid;
  }

  const doAddAccount = async () => {
    const data = {
      acName: textPlatformTitle,
      accounts: 0,
      userId: globalContext.userId
    }

    const resStoreData: any = await storeAccountData(globalContext.realm, data);
    setIsVisible(!isVisible)
    if (resStoreData.success) {
      doGetData()  
    } else {
      RNToasty.Show({title: 'Something went wrong!'});
    }
  }

  const doLogout = () => {
    globalContext.doLogoutUser()
    props.navigation.reset({
      index: 0,
      routes: [{name: Constants.LOGIN_SCREEN}],
    });
  }

  const renderAccounts: ListRenderItem<Accounts> = ({item, index}) => {
    return (
      <AccountItem
        id={item.id}
        title={item.acName}
        accounts={item.accounts}
        onClick={() => {
          props.navigation.navigate(Constants.DETAILS_SCREEN, {acId: item.id});
        }}
      />
    )
  }

  return (
    <SafeAreaView style={styles.mainContainerStyle}>
      <View style={styles.viewFlexContainer}>
        <HeaderCommon
          title={'Jon Snow'}
          onClickMenu={() => {}}
          onClickAdd={() => {setIsVisible(true)}}
          onClickLogout={doLogout}
        />
        <FlatList
          data={listOfAccounts}
          renderItem={renderAccounts}
          ItemSeparatorComponent={() => <View style={styles.viewDivider} />}
          ListEmptyComponent={() => (
            <View style={styles.viewEmptyMain}>
              <Image
                source={Theme.icons.icKey}
                resizeMode={'contain'}
                style={styles.imageEmpty}
              />
              <Text style={styles.textEmpty}>{'No accounts found!'}</Text>
            </View>
          )}
          contentContainerStyle={styles.viewContainerStyle}
          keyExtractor={(item, index) => index.toString()}
        />
        <AddAccount
          visible={isVisible}
          value={textPlatformTitle}
          placeholder={'Ex. Google'}
          error={textPlatformError}
          onChangeText={setTextPlatformTitle}
          onAddItem={() => {
            if (isValidPlatform()) {
              doAddAccount()
            }
          }}
          onClose={() => {
            setIsVisible(!isVisible)
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
