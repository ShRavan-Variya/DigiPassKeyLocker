class UsersSchema {
  static schema = {
    name: 'Users',
    primaryKey: 'userId',
    properties: {
      userId: {type: 'int'},
      firstName: {type: 'string', optional: true},
      lastName: {type: 'string', optional: true},
      email: {type: 'string', optional: true},
      token: {type: 'string', optional: true},
    },
  };

  constructor(
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    token: string,
  ) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.token = token;
  }

  public userId: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public token: string;
}

class AccountsSchema {
  static schema = {
    name: 'Accounts',
    primaryKey: 'id',
    properties: {
      id: {type: 'int'},
      acName: {type: 'string', optional: true},
      accounts: {type: 'int', optional: true},
      userId: {type: 'int', optional: true},
    },
  };

  constructor(
    id: number,
    acName: string,
    accounts: number,
    userId: number,
  ) {
    this.id = id;
    this.acName = acName;
    this.accounts = accounts;
    this.userId = userId;
  }

  public id: number;
  public acName: string;
  public accounts: number;
  public userId: number;
}

class DataSchema {
  static schema = {
    name: 'Data',
    primaryKey: 'id',
    properties: {
      id: {type: 'int'},
      acId: {type: 'int', optional: true},
      userId: {type: 'int', optional: true},
      data: {type: 'string', optional: true},
    },
  };

  constructor(
    id: number,
    acId: number,
    userId: number,
    data: string,
  ) {
    this.id = id;
    this.acId = acId;
    this.userId = userId;
    this.data = data;
  }

  public id: number;
  public acId: number;
  public userId: number;
  public data: string;
}

class SchemaNames {
  static UsersSchemaName = UsersSchema.schema.name;
  static AccountsSchemaName = AccountsSchema.schema.name;
  static DataSchemaName = DataSchema.schema.name;
}

export {
  UsersSchema,
  AccountsSchema,
  DataSchema,
  SchemaNames,
};
