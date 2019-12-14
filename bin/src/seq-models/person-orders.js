"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ORM = require("sequelize");
const mysql_front_1 = require("../connectors/mysql-front");
function iniPersonOrders(sequelize) {
    return sequelize.define('personOrders', {
        id: {
            type: ORM.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: ORM.INTEGER,
        rawData: ORM.STRING,
        details: ORM.STRING,
        status: ORM.STRING,
        belongsTo: ORM.STRING,
        payment_id: ORM.INTEGER,
        discount_id: ORM.INTEGER
    });
}
exports.PersonOrdersModel = iniPersonOrders(mysql_front_1.connector);
