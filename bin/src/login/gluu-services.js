"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_utils_1 = require("../utils/app-utils");
const axios_1 = require("axios");
async function validateUser(token, session) {
    const decoded = app_utils_1.decodeTokenSimple(token);
    let url = decoded.body.oxValidationURI;
    if (!url)
        return { error: 'token', message: 'no url in token' };
    url += '?access_token=' + session;
    return isValidSession(url, decoded.header.kid);
}
exports.validateUser = validateUser;
async function isValidSession(url, uid) {
    return new Promise(function (resolve, reject) {
        axios_1.default.get(url).then((res) => {
            res = res.data;
            resolve({
                valid: res.valid,
                expires: res.expires_in,
                uid
            });
        }).catch(err => {
            err.response ? resolve(err.response.data) : reject(err);
        });
    });
}
exports.isValidSession = isValidSession;
async function whoami(url, bearer) {
    return axios_1.default({
        url,
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + bearer
        }
    }).then(res => res.data);
}
exports.whoami = whoami;
