"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ORMS = require("sequelize");
const Sequelize = require("sequelize");
const server_config_1 = require("../../etc/server-config");
const options = {
    logging: server_config_1.serverConfig.mysql.log ? console.log : false,
    dialect: "mysql",
    operatorsAliases: Sequelize.Op,
    host: server_config_1.serverConfig.mysql.host
};
exports.connector = new ORMS(server_config_1.serverConfig.mysql.database, server_config_1.serverConfig.mysql.username, server_config_1.serverConfig.mysql.password, options);
async function testMysql() {
    return exports.connector.authenticate()
        .then(res => {
        console.log(server_config_1.serverConfig.mysql.database + ' connected !!!!');
    }).catch(console.error);
}
exports.testMysql = testMysql;
