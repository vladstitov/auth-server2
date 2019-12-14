"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_model_1 = require("../login-model");
const moment = require("moment");
async function logout(req) {
    const userId = req.session.userID;
    const userUID = req.session.userUID;
    if (!userId || !userUID)
        return { error: 'no_user', message: 'PROBABLY_SESSION_EXPIRED' };
    const user = await login_model_1.UserModel.findOne({ where: { id: userId }, raw: true });
    if (!user)
        return { error: 'no_user', message: 'NO_USER' };
    user.tokenID = null;
    user.status = 'logged_out';
    user.statusID = moment().format();
    const update = await login_model_1.UserModel.update(user, { where: { id: user.id } });
    if (update) {
        req.session.destroy(function (err) {
            if (err)
                console.error(err);
        });
        return { success: 'logged_out', message: 'HAVE_A_NICE_DAY' };
    }
    else
        return { error: 'db', message: 'DB_ERROR_TRY_AGAIN' };
}
exports.logout = logout;
