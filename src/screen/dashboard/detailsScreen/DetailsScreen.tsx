import React, { useEffect, useState } from 'react';
import {FlatList, Image, ListRenderItem, SafeAreaView, Text, View} from 'react-native';
import {TextDecoder, TextEncoder} from 'text-encoding';
import {RNToasty} from 'react-native-toasty';
import bs58 from 'bs58';
import {getDataListByAccountId, storeAccountItemListData, updateAccountItemListData} from '@app/store/DBOperations';
import {HeaderCommon} from '@app/components/HeaderCommon';
import {AddDetails} from '@app/components/CustomModals';
import {DetailItem} from '@app/components/DetailItem';
import {useGlobal} from '@app/contexts/GlobalContext';
import {Constants, Validations} from '@app/constants';
import Theme from '@app/theme/Theme';
import styles from './styles';

interface Details {
  id: number;
  acId: number;
  userId: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  mobile: string;
  details: string;
}

const DetailsScreen = (props: any) => {
  const globalContext = useGlobal();
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [listOfDetails, setListOfDetails] = useState<Details[]>([])
  
  const [id, setId] = useState<number>(0)
  const [accountId, setAccountId] = useState<number>(0)
  const [userId, setUserId] = useState<number>(0)

  const [textFirstName, setTextFirstName] = useState<string>('')
  const [textLastName, setTextLastName] = useState<string>('')
  const [textUserName, setTextUserName] = useState<string>('')
  const [textEmail, setTextEmail] = useState<string>('')
  const [textPassword, setTextPassword] = useState<string>('')
  const [textMobile, setTextMobile] = useState<string>('')
  const [textDescription, setTextDescription] = useState<string>('')

  const [errorName, setErrorName] = useState<any>(null)
  const [errorUserName, setErrorUserName] = useState<any>(null)
  const [errorEmail, setErrorEmail] = useState<any>(null)
  const [errorPassword, setErrorPassword] = useState<any>(null)
  const [errorMobile, setErrorMobile] = useState<any>(null)
  

  useEffect(() => {
    const {acId} = props.route.params;
    setAccountId(acId)
    doGetData(acId)
  }, [])
  
  const doGetData = async (acId: number) => {
    try {      
      const resAccountData: any = await getDataListByAccountId(globalContext.realm, globalContext.userId, acId);
      if (resAccountData && resAccountData.success) {
        const accountDataList = resAccountData.data;        
        doCreateListData(accountDataList);
      } else {
        console.log('resUserData :: ', resAccountData);
        const message = resAccountData.message;
        RNToasty.Show({title: message});
      }
    } catch (error: any) {
      RNToasty.Show({title: 'No data found!'});
    }
  }

  const doCreateListData = (accountListData: any) => {
    let currentItem = 0;
    const listLength = accountListData.length;
    const finalList = [];
    do {
      const currentItemData = accountListData[currentItem];
      const decodedUint8Array = bs58.decode(currentItemData.data);
      const decodedString = new TextDecoder().decode(decodedUint8Array);
      const decodedObject = JSON.parse(decodedString);
      const data = {
        id: currentItemData.id,
        acId: currentItemData.acId,
        userId: currentItemData.userId,
        ...decodedObject
      }     
      finalList.push(data)
      currentItem++;
    } while (currentItem < listLength);

    if (currentItem === listLength) {
      setListOfDetails(finalList)
    }
  }

  const doUpdateDetails = (item: Details) => {
    setId(item.id)
    setAccountId(item.acId)
    setUserId(item.userId)
    setTextFirstName(item.firstName)
    setTextLastName(item.lastName)
    setTextUserName(item.userName)
    setTextEmail(item.email)
    setTextPassword(item.password)
    setTextMobile(item.mobile)
    setTextDescription(item.details)
    setIsVisible(true)
  }

  const doSetTextById = (id: number, text: string) => {
    if (id === 1) {
      setTextFirstName(text)
    } else if (id === 2) {
      setTextLastName(text)
    } else if (id === 3) {
      setTextUserName(text)
    } else if (id === 4) {
      setTextEmail(text)
    } else if (id === 5) {
      setTextPassword(text)
    } else if (id === 6) {
      setTextMobile(text)
    } else if (id === 7) {
      setTextDescription(text)
    }
  }

  const isValidPlatform = () => {
    let valid = true;
    setErrorName(null)
    setErrorUserName(null)
    setErrorEmail(null)
    setErrorPassword(null)
    setErrorMobile(null)

    if (textFirstName.trim().length === 0 || textLastName.trim().length === 0) {
      valid = false;
      setErrorName('Please enter valid name!')
    } else if (textUserName.trim().length === 0) {
      valid = false;
      setErrorUserName('Please enter user name!')
    } else if (!Validations.isValidEmail(textEmail)) {
      valid = false;
      setErrorEmail('Please enter email!')
    } else if (textPassword.trim().length === 0) {
      valid = false;
      setErrorPassword('Please enter user name!')
    } else if (textMobile.trim().length === 0) {
      valid = false;
      setErrorMobile('Please enter user name!')
    }

    return valid;
  }

  const doAddAccountData = async () => {
    if (id > 0) {
      const insiderObj = {
        firstName: textFirstName,
        lastName: textLastName,
        userName: textUserName,
        email: textEmail,
        password: textPassword,
        mobile: textMobile,
        details: textDescription,
      }
      const jsonString = JSON.stringify(insiderObj);
      const uint8Array = new TextEncoder().encode(jsonString);
      const encodedString = bs58.encode(uint8Array);

      const finalData = {
        id: id,
        acId: accountId,
        userId: userId,
        data: encodedString
      }

      const resStoreData: any = await updateAccountItemListData(globalContext.realm, finalData);
      setIsVisible(!isVisible)
      if (resStoreData.success) {
        doClearText();
      } else {
        RNToasty.Show({title: 'Something went wrong!'});
      }
    } else {
      const data = {
        firstName: textFirstName,
        lastName: textLastName,
        userName: textUserName,
        email: textEmail,
        password: textPassword,
        mobile: textMobile,
        details: textDescription,
      }
      const jsonString = JSON.stringify(data);
      const uint8Array = new TextEncoder().encode(jsonString);
      const encodedString = bs58.encode(uint8Array);
      const resStoreData: any = await storeAccountItemListData(globalContext.realm, encodedString, accountId, globalContext.userId);
      setIsVisible(!isVisible)
      if (resStoreData.success) {
        doClearText();
      } else {
        RNToasty.Show({title: 'Something went wrong!'});
      }
    }
  }

  const doClearText = () => {
    setId(0)
    setTextFirstName('')
    setTextLastName('')
    setTextUserName('')
    setTextEmail('')
    setTextPassword('')
    setTextMobile('')
    setTextDescription('')
    doGetData(accountId)
  }

  const doLogout = () => {
    globalContext.doLogoutUser()
    props.navigation.reset({
      index: 0,
      routes: [{name: Constants.LOGIN_SCREEN}],
    });
  }

  const renderDetails: ListRenderItem<Details> = ({item, index}) => {
    return (
      <DetailItem
        id={item.id}
        firstName={item.firstName}
        lastName={item.lastName}
        userName={item.userName}
        email={item.email}
        password={item.password}
        mobile={item.mobile}
        details={item.details}
        onClick={() => {
          doUpdateDetails(item)
          // doChangeData(item.id, {})
        }}
      />
    )
  }

  return (
    <SafeAreaView style={styles.mainContainerStyle}>
      <View style={styles.viewFlexContainer}>
        <HeaderCommon
          isDetail={true}
          title={'Google'}
          onClickMenu={() => props.navigation.goBack()}
          onClickAdd={() => {setIsVisible(true)}}
          onClickLogout={doLogout}
        />
        <FlatList
          data={listOfDetails}
          renderItem={renderDetails}
          style={styles.viewList}
          ItemSeparatorComponent={() => <View style={styles.viewDivider} />}
          ListEmptyComponent={() => <View style={styles.viewEmptyMain}>
            <Image source={Theme.icons.icKey} resizeMode={'contain'} style={styles.imageEmpty} />
            <Text style={styles.textEmpty}>{'No password found!'}</Text>
          </View>}
          contentContainerStyle={styles.viewContainerStyle}
          keyExtractor={(item, index) => index.toString()}
        />
        <AddDetails
          visible={isVisible}
          firstName={textFirstName}
          lastName={textLastName}
          userName={textUserName}
          email={textEmail}
          password={textPassword}
          mobile={textMobile}
          details={textDescription}
          errName={errorName}
          errUserName={errorUserName}
          errEmail={errorEmail}
          errPassword={errorPassword}
          errMobile={errorMobile}
          onChangeText={doSetTextById}
          onAddItem={() => {
            if (isValidPlatform()) {
              doAddAccountData()
            }
          }}
          onClose={() => {
            setIsVisible(!isVisible)
            doClearText();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default DetailsScreen;
