"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
class Mappers {
    static deleteKnown(user) {
        const known = ['.uid', 'roles', 'givenName', 'lastName', 'birthdate',
            'preferredLanguage', 'email', 'addressLine1', 'addressLine2', 'country',
            'provinceState', 'city', 'homePhoneNumber', 'postalCodeZip', 'gender'];
        known.forEach(function (item) {
            delete user[item];
        });
        return user;
    }
    static fromGluuUser(user) {
        const gluuid = user.uid;
        const details = {
            gluuid: user.uid,
            user_id: 0,
            roles: user.roles.toString(),
            firstName: user.givenName,
            lastName: user.lastName,
            birthDate: moment(user.birthdate).format(),
            language: user.preferredLanguage,
            email: user.email,
            address1: user.addressLine1,
            address2: user.addressLine2,
            country: user.country,
            province: user.provinceState,
            city: user.city,
            phone: user.homePhoneNumber,
            postCode: user.postalCodeZip,
            gender: user.gender,
            email2: '',
            metaData: '',
            metaData2: '',
            middleName: '',
            parent: '',
            phone2: '',
            uid: '',
        };
    }
}
exports.Mappers = Mappers;
