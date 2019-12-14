"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_model_1 = require("../login-model");
const moment = require("moment");
const uuidV1 = require('uuid/v1');
const send_emails_1 = require("./send-emails");
const app_utils_1 = require("../../utils/app-utils");
async function requestResetPassword(email, confirmUrl) {
    const user = await login_model_1.UserModel.findOne({ where: { email: email }, raw: true });
    if (!user)
        return { error: 'not_exists', message: 'NOT_FOUND' };
    if (!user.confirmed)
        return { error: 'confirmation', message: 'PLEASE_CONFIRM_YOUR_EMAIL_FIRST' };
    if (user.status === 'reset_sent') {
        const diff = moment().diff(user.updatedAt, 'hours');
        const at = user.updatedAt;
        if (diff < 23) {
            return { error: 'reset_sent', message: 'RESET_PASSWORD_URL_SENT_TO_YOUR_EMAIL' };
        }
    }
    const tokenID = uuidV1();
    const uid = user.uid;
    const language = user.language;
    const token = app_utils_1.createToken({ uid, email, language });
    confirmUrl = confirmUrl + '?tokenID=' + tokenID + '&language=' + language;
    const sent = await send_emails_1.sendResetPasswordEmail(email, confirmUrl, '', user.language);
    if (sent.accepted) {
        user.statusID = moment().format();
        user.status = 'reset_sent';
        user.tokenID = tokenID;
        user.token = token;
        user.updatedAt = app_utils_1.mysqlTime();
    }
    else
        return { error: 'send_email', message: 'CANT_SEND_EMAIL', data: sent };
    const update = await login_model_1.UserModel.update(user, { where: { id: user.id } });
    if (!update)
        return { error: 'db', message: 'PLEASE_TRY_AGAIN' };
    if (update[0])
        return { success: 'email_sent', data: 'PLEASE_CHECK_EMAIL' };
    else {
        console.error('requestResetPassword update error ' + email);
        return { error: 'db', message: 'IGNORE_FIRST_EMAIL_AND_TRY_AGAIN' };
    }
}
exports.requestResetPassword = requestResetPassword;
