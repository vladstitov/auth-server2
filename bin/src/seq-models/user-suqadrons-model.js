"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ORM = require("sequelize");
const mysql_front_1 = require("../connectors/mysql-front");
function initUserSquadrons(sequelize) {
    return sequelize.define('user_squadrons', {
        user_id: ORM.INTEGER,
        squadron_id: ORM.STRING
    });
}
exports.UserSuqadronsModel = initUserSquadrons(mysql_front_1.connector);
