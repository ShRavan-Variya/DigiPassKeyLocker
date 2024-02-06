import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConstants from './constantVariable';

export const getDataFromCachedWithKey = (key: any) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key)
      .then((res: any) => {
        if (res !== null) {
          resolve(JSON.parse(res));
        } else {
          resolve(false);
        }
      })
      .catch((err: any) => reject(err));
  });
};

export const saveDataToCachedWithKey = (key: any, data: any) => {
  AsyncStorage.setItem(key, JSON.stringify(data));
};

export const removeDataFromCachedWithKey = (key: any) => {
  AsyncStorage.removeItem(key);
};

export const removeAllDataFromCache = () => {
  const arrExcludeValues = [AppConstants.AsyncKeyLiterals.userData];

  arrExcludeValues.map(item => {
    AsyncStorage.removeItem(item);
  });

  // for (let i = 0; i < allKeys.length; i++) {
  //   if (arrExcludeValues.includes(allKeys[i])) {
  //     AsyncStorage.removeItem(allKeys[i]);
  //   }
  // }
};
