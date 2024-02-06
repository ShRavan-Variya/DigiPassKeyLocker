import Realm from 'realm';
import {AccountsSchema, DataSchema, UsersSchema} from './db';

export const getRealmInstance = () => {
  return new Realm({
    path: 'DigiPassKeyLocker.realm',
    schemaVersion: 1,
    schema: [
      UsersSchema.schema,
      AccountsSchema.schema,
      DataSchema.schema,
    ],
  });
};
