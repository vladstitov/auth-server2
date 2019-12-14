"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const app_utils_1 = require("../../utils/app-utils");
const login_model_1 = require("../login-model");
const uuidV1 = require('uuid/v1');
async function loginUser(username, password, language) {
    password = app_utils_1.encryptPassword(password);
    const user = await login_model_1.UserModel.findOne({ where: { username: username, password: password }, raw: true });
    if (!user) {
        return { error: 'wrong', message: 'EMAIL_OR_PASSWORD_INCORRECT' };
    }
    if (!user.confirmed) {
        const diff = moment().diff(user.updatedAt, 'hours');
        return { error: 'confirmation', message: 'CONFIRMATION_REQUIRED', data: { diff } };
    }
    const uid = user.uid;
    const email = user.email;
    const token = app_utils_1.createToken({ email, uid, language });
    const tokenID = uuidV1();
    user.tokenID = tokenID;
    user.statusID = moment().format();
    user.status = 'logged_in';
    user.language = language;
    user.token = token;
    const update = await login_model_1.UserModel.update(user, { where: { id: user.id } });
    if (!update)
        return { error: 'db', message: 'PLEASE_RE_LOGIN' };
    const toSend = {
        success: 'logged_in',
        data: {
            tokenID,
            uid,
            token,
            email
        }
    };
    return toSend;
}
exports.loginUser = loginUser;
