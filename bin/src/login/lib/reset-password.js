"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_model_1 = require("../login-model");
const moment = require("moment");
const app_utils_1 = require("../../utils/app-utils");
const uuidV1 = require('uuid/v1');
async function resetPassword(tokenID, password) {
    const user = await login_model_1.UserModel.findOne({ where: { tokenID }, raw: true });
    if (!user)
        return { error: 'not_exists', message: 'NOT_EXISTS' };
    if (user.status !== 'reset_sent')
        return {
            error: 'status_unknown',
            message: 'PLEASE_TRY_AGAIN_RESET_PASSWORD',
            data: user.status
        };
    const diff = moment().diff(user.updatedAt, 'hours');
    if (diff > 24)
        return { error: 'expired', message: 'TOKEN_EXPIRED', data: { at: user.updatedAt, diff } };
    password = app_utils_1.encryptPassword(password);
    const email = user.email;
    const uid = user.uid;
    const language = user.language;
    const token = app_utils_1.createToken({ uid, email, language });
    user.password = password;
    user.tokenID = uuidV1();
    user.token = token;
    user.status = 'new_password';
    user.statusID = moment().format();
    const update = await login_model_1.UserModel.update(user, { where: { id: user.id } });
    if (Array.isArray(update) && update[0])
        return { success: 'new_password', message: 'PLEASE_LOGIN_WITH_NEW_PASSWORD' };
    console.error(' resetPassword error update  ' + tokenID);
    return { error: 'db', message: 'PLEASE_TRY_AGAIN' };
}
exports.resetPassword = resetPassword;
