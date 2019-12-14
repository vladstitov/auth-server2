"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_model_1 = require("../login-model");
const moment = require("moment");
const uuidV1 = require('uuid/v1');
const app_utils_1 = require("../../utils/app-utils");
const send_emails_1 = require("./send-emails");
async function registerUser(username, email, password, ip, confirmUrl, language) {
    const user = await login_model_1.UserModel.findOne({ where: { username: username }, raw: true });
    if (user && user.confirmed)
        return { error: 'exists', message: 'PLEASE_LOGIN' };
    if (user) {
        const diff = moment().diff(user.updatedAt, 'hours');
        const at = user.updatedAt;
        if (diff < 23) {
            return { error: 'confirmation', message: 'CONFIRMATION_REQUIRED', data: diff };
        }
        else {
            await login_model_1.UserModel.destroy({ where: { id: user.id } });
        }
    }
    password = app_utils_1.encryptPassword(password);
    const tokenID = uuidV1();
    const uid = uuidV1();
    const token = app_utils_1.createToken({ uid, email, language });
    confirmUrl += '?tokenID=' + tokenID + '&language=' + language;
    let newUser = {
        id: 0,
        email: email,
        password: password,
        confirmed: null,
        roles: 'none',
        username,
        uid,
        status: 'created',
        tokenID,
        language,
        token,
        statusID: moment().format()
    };
    const sent = await send_emails_1.sendConfirmationEmail(email, confirmUrl, language);
    if (sent.accepted) {
        newUser.statusID = sent.messageId;
        newUser.status = 'email_sent';
    }
    else
        return { error: 'send', message: 'CANT_SEND_EMAIL', data: sent };
    const insert = await login_model_1.UserModel.create(newUser).then((res) => {
        return res.get({ plain: true });
    });
    if (insert)
        return { success: 'email_sent', data: insert, message: 'EMAIL_SENT_TO_EMAIL' };
    else
        return { error: 'db_update', message: 'EMAIL_SENT_BUT_NOT_VALID' };
}
exports.registerUser = registerUser;
