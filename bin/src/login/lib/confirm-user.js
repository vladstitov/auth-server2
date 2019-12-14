"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_model_1 = require("../login-model");
const moment = require("moment");
const person_model_1 = require("../../seq-models/person.model");
const app_utils_1 = require("../../utils/app-utils");
const uuidV1 = require('uuid/v1');
async function upsertPersonUidByEmail(uid, email) {
    let person = await person_model_1.PersonModel.findOne({ where: { email }, raw: true });
    console.log(' person by email ');
    if (!person) {
        return await person_model_1.PersonModel.create({
            uid,
            email
        });
    }
    else {
        if (person.uid === uid)
            return person;
        person.uid = uid;
        const id = person.id;
        let update = await person_model_1.PersonModel.update(person, { where: { id } });
        if (update)
            return person;
        return null;
    }
}
exports.upsertPersonUidByEmail = upsertPersonUidByEmail;
async function confirmUser(tokenID) {
    const user = await login_model_1.UserModel.findOne({ where: { tokenID }, raw: true });
    console.log('confirmUser user ' + tokenID);
    if (!user)
        return { error: 'not_exists', message: 'NOT_EXISTS' };
    if (user.confirmed) {
        return { success: 'confirmed', mesagge: 'WAS_CONFIRMED', data: { uid: user.uid } };
    }
    const diff = moment().diff(user.updatedAt, 'hours');
    if (diff > 24) {
        login_model_1.UserModel.destroy({ where: { id: user.id } });
        return { error: 'expired', message: 'TOKEN_EXPIRED', data: { at: user.updatedAt, diff } };
    }
    const uid = user.uid;
    const email = user.email;
    const language = user.language;
    const token = app_utils_1.createToken({ uid, email, language });
    tokenID = uuidV1();
    user.confirmed = moment().format();
    user.roles = 'user';
    user.status = 'confirmed';
    user.statusID = moment().format();
    user.tokenID = tokenID;
    user.token = token;
    let update = await login_model_1.UserModel.update(user, { where: { id: user.id } });
    if (!update)
        return { error: 'db1_update', message: 'PLEASE_TRY_AGAIN' };
    return { success: 'success', data: { tokenID } };
}
exports.confirmUser = confirmUser;
