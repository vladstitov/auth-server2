"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_model_1 = require("../login-model");
const moment = require("moment");
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
