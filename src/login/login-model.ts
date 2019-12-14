import * as ORM from "sequelize";
import {Sequelize, LoggingOptions} from "sequelize";
import * as path from 'path';
import {connector} from "../connectors/mysql-front";

//TODO create table with auto timestamp createdAt , updatedAt `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
//   `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
function initUserModel(sequelize: Sequelize) {
  return sequelize.define('important', {
    id: {
      type: ORM.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: ORM.STRING,
    username: {
      type: ORM.STRING,
      unique: true
    },
    confirmed: ORM.STRING,
    statusID: ORM.STRING,
    email: {
      type: ORM.STRING,
      unique: true
    },
    password: ORM.STRING,
    roles: ORM.STRING,
    uid: {
      type: ORM.STRING,
      unique: true
    },
    language: ORM.STRING,
    token: ORM.TEXT,
    tokenID: {
      type: ORM.STRING,
      unique: true
    }
  });
}

export const UserModel = initUserModel(connector);


export interface VOUser {
  id: number;
  uid: string;
  email: string;
  password: string;
  confirmed: string;
  username?: string;
  roles: string;
  language: string;
  status?: string;
  statusID?: string;
  tokenID: string;
  token?: string
  createdAt?: string;
  updatedAt?: string;
}


export interface VOUserGluu{
  addressLine1:string;
  addressLine2:string;
  birthdate: string;
  city: string;
  country: string;
  email: string;
  emailVerified: boolean;
  gender: string;
  givenName: string;
  homePhoneNumber: string;
  isActivated: boolean;
  lastName: string;
  membershipType: string;
  postalCodeZip: string;
  preferredLanguage:string;
  provinceState: string;
  roles: string[];
  squadronIDs: string[];
  uid: string;
  updatedAt: string;
}
