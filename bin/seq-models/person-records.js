"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ORM = require("sequelize");
function iniPersonRecors(sequelize) {
    return sequelize.define('personOrders', {
        id: {
            type: ORM.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: ORM.INTEGER,
        rawData: ORM.STRING,
        column: ORM.STRING,
        record: ORM.STRING,
        table: ORM.STRING
    });
}
