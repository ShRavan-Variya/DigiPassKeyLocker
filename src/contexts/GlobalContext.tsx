import React, {createContext, useState, useContext, FC} from 'react';
import {cacheData, AppConstants} from '@app/module';
import { saveToken } from '@app/api';

export interface GlobalContextData {
  secretKey: any;
  realm: any;
  setRealmData: (data: any) => void;
  isLogin: boolean;
  setLogin: (text: boolean) => void;
  userData: any;
  setLoginUserData: (data: any) => void;
  userId: number;
  setMainUserId: (data: number) => void;
  doLogoutUser: () => void;
  userDetails: any;
  doSetUserDetails: (data: any) => void;
  currentUnitId: string;
  doSetCurrentUnitId: (data: any) => void;
}

const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData);

const GlobalProvider: FC<any> = ({realmInstance, children}) => {
  console.log('REALM realmInstance :: ' + realmInstance);
  const secretKey = 'DigiPassKeyLocker';
  const [realm, setRealm] = useState(realmInstance);
  // console.log('REALM isClosed :: ' + realm.isClosed);
  console.log(realm.path);

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const [userId, setUserId] = useState<number>(0);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [currentUnitId, setCurrentUnitId] = useState<string>('');

  const setRealmData = (data: any) => {
    setRealm(data);
  };

  const setLogin = (text: boolean) => {
    setIsLogin(text);
  };
  const setLoginUserData = (data: any) => {
    setUserData(data);
  };
  const setMainUserId = (text: number) => {
    setUserId(text);
  };
  const doSetUserDetails = (text: string) => {
    setUserDetails(text);
  };
  const doSetCurrentUnitId = (text: string) => {
    setCurrentUnitId(text);
  };

  const doLogoutUser = () => {
    saveToken(null);
    const asyncItem = AppConstants.AsyncKeyLiterals;
    cacheData.saveDataToCachedWithKey(asyncItem.isLoggedIn, false);
    cacheData.saveDataToCachedWithKey(asyncItem.userData, null);
    cacheData.saveDataToCachedWithKey(asyncItem.loginUserId, null);
    setLogin(false);
    setLoginUserData(null);
    setMainUserId(0);
  };

  return (
    <GlobalContext.Provider
      value={{
        secretKey,
        realm,
        setRealmData,
        isLogin,
        setLogin,
        userData,
        setLoginUserData,
        userId,
        setMainUserId,
        doLogoutUser,
        userDetails,
        doSetUserDetails,
        currentUnitId,
        doSetCurrentUnitId,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

function useGlobal(): GlobalContextData {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useGlobal must be used within an GlobalContext');
  }

  return context;
}

export {GlobalContext, GlobalProvider, useGlobal};
