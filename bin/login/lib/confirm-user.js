"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_model_1 = require("../login-model");
const moment = require("moment");
const app_utils_1 = require("../../utils/app-utils");
const uuidV1 = require('uuid/v1');
async function confirmUser(tokenID) {
    const user = await login_model_1.UserModel.findOne({ where: { tokenID }, raw: true });
    console.log('confirmUser user ' + tokenID);
    if (!user)
        return { error: 'not_exists', message: 'CONFIRM_NOT_EXISTS' };
    if (user.confirmed) {
        return { success: 'confirmed', message: 'WAS_CONFIRMED', data: { uid: user.uid } };
    }
    const diff = moment().diff(user.updatedAt, 'hours');
    if (diff > 24) {
        login_model_1.UserModel.destroy({ where: { id: user.id } });
        return { error: 'expired', message: 'TOKEN_EXPIRED', data: { at: user.updatedAt, diff } };
    }
    const uid = user.uid;
    const email = user.email;
    const language = user.language;
    user.confirmed = moment().format();
    user.roles = 'user';
    user.status = 'confirmed';
    user.statusID = moment().format();
    user.updatedAt = app_utils_1.mysqlTime();
    let update = await login_model_1.UserModel.update(user, { where: { id: user.id } });
    if (!update)
        return { error: 'db1_update', message: 'PLEASE_GO_TO_EMAIL_AND_TRY_AGAIN' };
    return { success: 'success', data: { tokenID } };
}
exports.confirmUser = confirmUser;
