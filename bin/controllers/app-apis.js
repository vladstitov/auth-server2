"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const lib_1 = require("../login/lib");
const app_utils_1 = require("../utils/app-utils");
const path = require("path");
async function getPersonAutByTokenId(tokenID) {
    const url = 'http://localhost:49888/api/auth/get-login-user/' + tokenID;
    const result = await axios_1.default.get(url).then(res => res.data);
    if (!result.success)
        return result;
    const auth = result.data;
    if (!auth.uid) {
        return { error: 'not_login', message: 'USER_NOT_LOGGED_IN' };
    }
    const uid = auth.uid;
    const email = auth.email;
    const language = auth.language;
    const roles = auth.roles;
    console.log(auth);
    const person = await lib_1.getPersonByUidOrEmail(uid, email, language);
    return { person, language, roles, uid };
}
exports.getPersonAutByTokenId = getPersonAutByTokenId;
function initAuthTransfer(app) {
    app.get('/app-login/:tokenID', function (req, resp) {
        const tokenID = req.params.tokenID;
        getPersonAutByTokenId(tokenID).then(data => {
            if (data.error) {
                resp.json(data);
                return;
            }
            const person = data.person;
            const app = person.firstName ? 'dashboard' : 'profile';
            let p = path.join(__dirname, '../etc', app + '.html');
            resp.sendFile(p);
        });
    });
    app.get('/api/login-by-token/:tokenID', function (req, resp) {
        const tokenID = req.params.tokenID;
        ;
        getPersonAutByTokenId(tokenID).then(data => {
            if (data.error) {
                resp.json(data);
                return;
            }
            const person = data.person;
            req.session.userID = person.id;
            req.session.roles = data.roles;
            req.session.userUID = data.uid;
            resp.json({ success: 'success', data });
        })
            .catch(err => app_utils_1.onProcessError(req, resp, err));
    });
}
exports.initAuthTransfer = initAuthTransfer;
