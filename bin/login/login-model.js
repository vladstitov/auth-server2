"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ORM = require("sequelize");
const mysql_front_1 = require("../connectors/mysql-front");
function initUserModel(sequelize) {
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
exports.UserModel = initUserModel(mysql_front_1.connector);
