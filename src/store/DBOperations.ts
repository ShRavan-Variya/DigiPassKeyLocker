import Realm, {UpdateMode} from 'realm';
import {RNToasty} from 'react-native-toasty';
import Moment from 'moment';
import {SchemaNames} from './db';

// ###############
// #### STORE DATA IN DATABASE
// 1.1 store user data into local db.
export const storeUserData = (realm: Realm, itemData: any) => {
  return new Promise((resolve, reject) => {
    try {
      let userId = 0;
      realm.write(() => {

        const checkEmptyList: any =
          realm.objects(SchemaNames.UsersSchemaName).length > 0
            ? realm
                .objects(SchemaNames.UsersSchemaName)
                .filtered('userId == $0', itemData.userId)
            : [];

        if (checkEmptyList && checkEmptyList.length > 0) {
          userId = checkEmptyList[0].userId;
        } else {
          const lastMaxId: any = realm
            .objects(SchemaNames.UsersSchemaName)
            .max('userId');
          if (lastMaxId) {
            userId = lastMaxId + 1;
          } else {
            userId = 1;
          }
        }

        realm.create(
          SchemaNames.UsersSchemaName,
          {
            userId: userId,
            firstName: itemData.firstName,
            lastName: itemData.lastName,
            email: itemData.email,
            token: itemData.token,
          },
          UpdateMode.Modified,
        );
      });

      resolve({
        success: true,
        userId: userId,
        message: 'User successfully stored in db',
      });
    } catch (error) {
      reject({
        success: false,
        message: 'Error while storing user: ' + error,
      });
    }
  });
};
// 2.1 store account into local db.
export const storeAccountData = (realm: Realm, itemData: any) => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const checkEmptyList: any =
          realm.objects(SchemaNames.AccountsSchemaName).length > 0
            ? realm
                .objects(SchemaNames.AccountsSchemaName)
                .filtered('id == $0', itemData.id)
            : [];

        let id = 0;
        if (checkEmptyList && checkEmptyList.length > 0) {
          id = checkEmptyList[0].id;
        } else {
          const lastMaxId: any = realm
            .objects(SchemaNames.AccountsSchemaName)
            .max('id');
          if (lastMaxId) {
            id = lastMaxId + 1;
          } else {
            id = 1;
          }
        }

        realm.create(
          SchemaNames.AccountsSchemaName,
          {
            id: id,
            acName: itemData.acName,
            accounts: itemData.accounts,
            userId: itemData.userId,
          },
          UpdateMode.Modified,
        );
      });

      resolve({
        success: true,
        message: 'Account successfully stored in db',
      });
    } catch (error) {
      reject({
        success: false,
        message: 'Error while storing account: ' + error,
      });
    }
  });
};
// 3.1 store account into local db.
export const storeAccountItemListData = (realm: Realm, itemData: string, acId: number, userId: number) => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        let id = 0;
        const lastMaxId: any = realm
          .objects(SchemaNames.DataSchemaName)
          .max('id');
        if (lastMaxId) {
          id = lastMaxId + 1;
        } else {
          id = 1;
        }

        const accountData: any = realm
          .objects(SchemaNames.AccountsSchemaName)
          .filtered('id == $0 AND userId == $1', acId, userId)[0];

        const accountCount = accountData.accounts + 1

        realm.create(
          SchemaNames.AccountsSchemaName,
          {
            id: acId,
            acName: accountData.acName,
            accounts: accountCount,
            userId: accountData.userId,
          },
          UpdateMode.Modified,
        );

        realm.create(
          SchemaNames.DataSchemaName,
          {
            id: id,
            acId: acId,
            userId: userId,
            data: itemData,
          },
          UpdateMode.Modified,
        );
      });

      resolve({
        success: true,
        message: 'Account successfully stored in db',
      });
    } catch (error) {
      reject({
        success: false,
        message: 'Error while storing account: ' + error,
      });
    }
  });
};

// ###############
// #### GET DATA FROM DATABASE
// 1.1 get user data from local db.
export const getUserDataByEmail = (realm: Realm, email: string) => {
  return new Promise((resolve, reject) => {
    try {
      const userData = realm.write(() => {
        return realm
          .objects(SchemaNames.UsersSchemaName)
          .filtered('email == $0', email)[0];
      });
      resolve({
        success: true,
        message: 'User data fetched from DB',
        data: userData,
      });
    } catch (error) {
      reject({
        success: false,
        message: 'Account not found: ' + error,
      });
    }
  });
};

// 2.1 get accounts list from local db.
export const getAccountListByUserId = (realm: Realm, userId: number) => {
  return new Promise((resolve, reject) => {
    try {
      const accountData = realm.write(() => {
        return realm
          .objects(SchemaNames.AccountsSchemaName)
          .filtered('userId == $0', userId);
      });
      resolve({
        success: true,
        message: 'User data fetched from DB',
        data: accountData,
      });
    } catch (error) {
      reject({
        success: false,
        message: 'Account not found: ' + error,
      });
    }
  });
};

// 3.1 get data list from local db.
export const getDataListByAccountId = (realm: Realm, userId: number, acId: number) => {
  return new Promise((resolve, reject) => {
    try {
      const itemData = realm.write(() => {
        return realm
          .objects(SchemaNames.DataSchemaName)
          .filtered('acId == $0 AND userId == $1', acId, userId);
      });
      resolve({
        success: true,
        message: 'User data fetched from DB',
        data: itemData,
      });
    } catch (error) {
      reject({
        success: false,
        message: 'Account not found: ' + error,
      });
    }
  });
};


// ###############
// #### UPDATE DATA IN DATABASE
// 3.1 get user data from local db.
export const updateAccountItemListData = (realm: Realm, finalData: any) => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const itemMainData = realm
          .objects(SchemaNames.DataSchemaName)
          .filtered('id == $0 AND acId == $1 AND userId == $2', finalData.id, finalData.acId, finalData.userId)[0];

        realm.create(
          SchemaNames.DataSchemaName,
          {
            id: finalData.id,
            acId: finalData.acId,
            userId: finalData.userId,
            data: finalData.data,
          },
          UpdateMode.Modified,
        );
      });
      resolve({
        success: true,
        message: 'User data updated successfully!',
      });
    } catch (error) {
      reject({
        success: false,
        message: 'Error while updating the data: ' + error,
      });
    }
  });
};