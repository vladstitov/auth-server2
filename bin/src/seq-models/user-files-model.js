"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ORM = require("sequelize");
const mysql_front_1 = require("../connectors/mysql-front");
function initPersonFilesModel(sequelize) {
    return sequelize.define('userFiles', {
        belongs: ORM.STRING,
        user_id: ORM.INTEGER,
        filename: ORM.STRING,
        status: ORM.STRING,
        webPath: ORM.STRING,
        path: ORM.STRING
    });
}
exports.PersonFilesModel = initPersonFilesModel(mysql_front_1.connector);
exports.PersonFilesModel.removeAttribute('id');
