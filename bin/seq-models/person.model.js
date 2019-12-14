"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ORM = require("sequelize");
const mysql_front_1 = require("../connectors/mysql-front");
function initUserDetails(sequelize) {
    return sequelize.define('persons', {
        id: {
            type: ORM.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        uid: ORM.STRING,
        birthday: ORM.STRING,
        firstName: ORM.STRING,
        lastName: ORM.STRING,
        middleName: ORM.STRING,
        gender: ORM.STRING,
        language: ORM.STRING,
        phone: ORM.STRING,
        phone2: ORM.STRING,
        email: ORM.STRING,
        email2: ORM.STRING,
        metaData: ORM.STRING
    });
}
exports.PersonModel = initUserDetails(mysql_front_1.connector);
function initAddress(sequelize) {
    return sequelize.define('addresses', {
        id: {
            type: ORM.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: ORM.INTEGER,
        addressType: ORM.STRING,
        address1: ORM.STRING,
        address2: ORM.STRING,
        country: ORM.STRING,
        city: ORM.STRING,
        province: ORM.STRING,
        postCode: ORM.STRING,
    });
}
exports.AddressModel = initAddress(mysql_front_1.connector);
class VOAddress {
}
exports.VOAddress = VOAddress;
class VOPersonFile {
}
exports.VOPersonFile = VOPersonFile;
class VOPerson {
    constructor(obj) {
        if (obj) {
            this.apply(obj);
        }
    }
    apply(obj) {
        for (const str in obj) {
            this[str] = obj[str];
        }
    }
}
exports.VOPerson = VOPerson;
class VOContact {
    constructor(obj) {
        if (obj)
            this.apply(obj);
    }
    apply(obj) {
        for (const str in obj) {
            this[str] = obj[str];
        }
    }
}
exports.VOContact = VOContact;
class VOOrder {
    constructor(obj) {
        if (obj)
            this.apply(obj);
    }
    apply(obj) {
        for (const str in obj) {
            this[str] = obj[str];
        }
    }
}
exports.VOOrder = VOOrder;
class VOMemberSubscription {
    constructor(obj) {
        if (obj)
            this.apply(obj);
    }
    apply(obj) {
        for (const str in obj) {
            this[str] = obj[str];
        }
    }
}
exports.VOMemberSubscription = VOMemberSubscription;
class VOMember extends VOPerson {
    constructor(obj) {
        super(obj);
    }
}
exports.VOMember = VOMember;
