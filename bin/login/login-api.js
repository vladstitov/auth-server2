"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_utils_1 = require("../utils/app-utils");
const lib_1 = require("./lib");
const lib_2 = require("./lib");
const lib_3 = require("./lib");
const lib_4 = require("./lib");
const lib_5 = require("./lib");
const lib_6 = require("./lib");
const express = require("express");
const server_config_1 = require("../server-config");
const login_model_1 = require("./login-model");
const moment = require("moment");
exports.router = express.Router();
exports.router.get('/api/auth/get-login-user/:tokenID', function (req, resp) {
    const tokenId = req.params.tokenID;
    lib_1.getLoggedInUserByTokenId(tokenId)
        .then((res) => {
        resp.json(res);
    })
        .catch(err => app_utils_1.onProcessError(req, resp, err));
});
exports.router.get("/api/auth/reset-password-token/", function (req, resp) {
    if (server_config_1.serverConfig.blockIPonAttempt) {
        let ip = app_utils_1.checkIp('resetPasswordToken', req, server_config_1.serverConfig.blockIPonAttempt);
        if (!ip) {
            resp.json({ error: 'annoying', message: 'Too many requests. Please try later' });
            return;
        }
    }
    let tokenID = req.query.tokenID;
    if (!tokenID) {
        resp.json({ error: 'tokenID' });
        return;
    }
    login_model_1.UserModel.findOne({ where: { tokenID } }).then((user) => {
        if (user) {
            const diff = moment().diff(user.updatedAt, 'hours');
            if (diff > 24)
                resp.redirect(server_config_1.serverConfig.redirects.errorRestPasswordExpired);
            else
                resp.redirect(server_config_1.serverConfig.redirects.resetPassword + tokenID);
        }
        else
            resp.redirect(server_config_1.serverConfig.redirects.errorRestPasswordInvalidToken);
    }).catch(err => app_utils_1.onProcessError(req, resp, err));
});
exports.router.post("/api/auth/reset-password-confirm", function (req, resp) {
    if (server_config_1.serverConfig.blockIPonAttempt) {
        let ip = app_utils_1.checkIp('resetConfirm', req, server_config_1.serverConfig.blockIPonAttempt);
        if (!ip) {
            resp.json({ error: 'annoying', message: 'Too many requests. Please try later' });
            return;
        }
    }
    let password = req.body.password;
    let tokenID = req.body.tokenID;
    if (!password || !tokenID) {
        resp.json({ error: 'tokenID' });
        return;
    }
    lib_6.resetPassword(tokenID, password)
        .then(res => {
        resp.json(res);
    })
        .catch(err => app_utils_1.onProcessError(req, resp, err));
});
exports.router.post('/api/auth/reset-password', function (req, resp) {
    if (server_config_1.serverConfig.blockIPonAttempt) {
        let ip = app_utils_1.checkIp('resetPassword', req, server_config_1.serverConfig.blockIPonAttempt);
        if (!ip) {
            resp.json({ error: 'annoying', message: 'PLEASE_TRY_IN_ONE_HOUR' });
            return;
        }
    }
    let email = req.body.email;
    let confirmUrl = server_config_1.serverConfig.resetPasswordUrl;
    if (!email || !confirmUrl) {
        resp.json({ error: 'url-required' });
        return;
    }
    lib_1.requestResetPassword(email, confirmUrl)
        .then(res => {
        resp.json(res);
    })
        .catch(err => app_utils_1.onProcessError(req, resp, err));
});
exports.router.post('/api/auth/logout', function (req, resp) {
    lib_2.logout(req)
        .then(res => {
        req.session = null;
        req.sessionID = null;
        resp.json(res);
    })
        .catch(err => app_utils_1.onProcessError(req, resp, err));
});
exports.router.post('/api/auth/login', function (req, resp) {
    if (server_config_1.serverConfig.blockIPonAttempt) {
        let ip = app_utils_1.checkIp('login', req, server_config_1.serverConfig.blockIPonAttempt);
        if (!ip) {
            resp.json({ error: 'annoying', message: 'PLEASE_TRY_IN_ONE_HOUR' });
            return;
        }
    }
    const email = req.body.email;
    let password = req.body.password;
    const language = req.body.language;
    lib_3.loginUser(email, password, language)
        .then(res => {
        resp.json(res);
    })
        .catch(err => app_utils_1.onProcessError(req, resp, err));
});
exports.router.post('/api/auth/register', function (req, resp) {
    let ip = '';
    if (server_config_1.serverConfig.blockIPonAttempt) {
        ip = app_utils_1.checkIp('register', req, server_config_1.serverConfig.blockIPonAttempt);
        if (!ip) {
            resp.json({ error: 'annoying', message: 'PLEASE_TRY_IN_ONE_HOUR' });
            return;
        }
    }
    let email = req.body.email;
    if (!app_utils_1.isEmailValid(email)) {
        resp.json({ error: 'email', message: 'EMAIL_INVALID' });
        return;
    }
    let password = req.body.password;
    const language = req.body.language;
    let deviceid = req.headers['user-agent'];
    let confirmUrl = server_config_1.serverConfig.confirmEmailUrl;
    lib_4.registerUser(email, email, password, ip, confirmUrl, language)
        .then(res => resp.json(res))
        .catch(err => app_utils_1.onProcessError(req, resp, err));
});
exports.router.get('/api/auth/confirm-email', function (req, resp) {
    const tokenID = req.query.tokenID;
    const language = req.query.language;
    console.log(' confirm email' + tokenID);
    if (!tokenID) {
        resp.end('hacker');
        return;
    }
    if (server_config_1.serverConfig.blockIPonAttempt) {
        let ip = app_utils_1.checkIp('confirmEmail', req, server_config_1.serverConfig.blockIPonAttempt);
        if (!ip) {
            resp.json({ error: 'annoying', message: 'PLEASE_TRY_IN_ONE_HOUR' });
            return;
        }
    }
    lib_5.confirmUser(tokenID)
        .then(res => {
        if (res.success) {
            resp.redirect(server_config_1.serverConfig.redirects.confirmEmailSuccess);
        }
        else
            resp.redirect(server_config_1.serverConfig.redirects.confirmEmailError + res.message);
    })
        .catch(err => app_utils_1.onProcessError(req, resp, err));
});
