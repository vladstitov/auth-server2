import * as ORMS from "sequelize";
import * as Sequelize from 'sequelize';
import {serverConfig} from '../server-config';


const options: any = {
  // benchmark: true,
  logging: serverConfig.mysql.log ? console.log: false,
  dialect: "mysql",
  operatorsAliases: Sequelize.Op,
  host: serverConfig.mysql.host
};

export const connector = new ORMS(serverConfig.mysql.database,
  serverConfig.mysql.username,
  serverConfig.mysql.password,
  options);


export async function testMysql() {
  return connector.authenticate()
    .then(res => {
    console.log(serverConfig.mysql.database + ' connected !!!!');
  }).catch(console.error);
}
