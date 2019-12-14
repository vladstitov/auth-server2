"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_model_1 = require("../login-model");
const moment = require("moment");
const person_model_1 = require("../../seq-models/person.model");
const confirm_user_1 = require("./confirm-user");
async function getPersonByUidOrEmail(uid, email, language) {
    let person = await person_model_1.PersonModel.findOne({ where: { uid }, raw: true });
    if (!person)
        person = await confirm_user_1.upsertPersonUidByEmail(uid, email);
    return person;
}
exports.getPersonByUidOrEmail = getPersonByUidOrEmail;
async function getLoggedInUserByTokenId(tokenID) {
    const user = await login_model_1.UserModel.findOne({ where: { tokenID } });
    if (user && user.status === 'logged_in') {
        const diff = moment().diff(user.updatedAt, 'minutes');
        if (diff > 5)
            return { error: 'expired', message: 'TOKEN_EXPIRED_PLEASE_RE_LOGIN' };
        return {
            success: 'success', data: {
                uid: user.uid,
                language: user.language,
                roles: user.roles,
                email: user.email
            }
        };
    }
    return { error: 'unknown', message: 'PLEASE_RE_LOGIN' };
}
exports.getLoggedInUserByTokenId = getLoggedInUserByTokenId;
