"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const cryptojs = require("crypto-js");
const fs = require("fs");
const path = require("path");
const JWT = require("jsonwebtoken");
const server_config_1 = require("../server-config");
const moment = require("moment");
const atob = require('atob');
const SHA256 = cryptojs.SHA256;
var privateKEY = fs.readFileSync(path.resolve('./etc/private.key'), 'utf8');
var publicKEY = fs.readFileSync(path.resolve('./etc/public.key'), 'utf8');
const issuer = server_config_1.serverConfig.token.issuer;
const subject = server_config_1.serverConfig.token.subject;
const audience = server_config_1.serverConfig.token.audience;
const algorithm = server_config_1.serverConfig.token.algorithm;
const expiresIn = server_config_1.serverConfig.token.expiresIn;
function createToken(payload) {
    const signOptions = {
        issuer,
        subject,
        audience,
        expiresIn,
        algorithm
    };
    return JWT.sign(payload, privateKEY, signOptions);
}
exports.createToken = createToken;
function decodeTokenSimple(token) {
    const ar = token.split('.');
    ar.pop();
    const header = JSON.parse(atob(ar[0]));
    const body = JSON.parse(atob(ar[1]));
    const signature = ar[2];
    return { header, body };
}
exports.decodeTokenSimple = decodeTokenSimple;
function decodeToken(token) {
    return JWT.decode(token, { complete: true });
}
exports.decodeToken = decodeToken;
function verifyToken(token) {
    var verifyOptions = {
        issuer,
        subject,
        audience,
        expiresIn,
        algorithm: [algorithm]
    };
    return JWT.verify(token, publicKEY);
}
exports.verifyToken = verifyToken;
function encryptPassword(pass) {
    return SHA256(pass).toString();
}
exports.encryptPassword = encryptPassword;
const algorithmCTR = 'aes-256-ctr', algorithmGSM = 'aes-256-gcm', PASSWORD = '3zTvzr3p67VC61jmV54rIYu1545x4TlY';
exports.EXPIRATION_TIME = 180;
function hashPassword(password, callBack) {
    crypto.pbkdf2(password, PASSWORD, 9, 32, 'sha512', (err, derivedKey) => {
        if (err)
            callBack({ error: 'error' });
        else
            callBack({ hash: derivedKey.toString('hex') });
    });
}
exports.hashPassword = hashPassword;
function isEmailValid(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}
exports.isEmailValid = isEmailValid;
function encryptCustom(email, password) {
    let n = password.length + '';
    if (n.length == 1)
        n = '0' + n;
    return n + password + email;
}
exports.encryptCustom = encryptCustom;
function decryptCustom(url) {
    let index = +url.substr(0, 2);
    if (isNaN(index))
        return null;
    url = url.substr(2);
    let email = url.substr(index);
    let password = url.substr(0, index);
    return {
        email: email,
        password: password
    };
}
exports.decryptCustom = decryptCustom;
function encryptCTR(text) {
    var cipher = crypto.createCipher(algorithmCTR, PASSWORD);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
exports.encryptCTR = encryptCTR;
function decryptCTR(text) {
    var decipher = crypto.createDecipher(algorithmCTR, PASSWORD);
    var dec;
    try {
        dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
    }
    catch (e) {
        console.error(e);
    }
    return dec;
}
exports.decryptCTR = decryptCTR;
let ips = {};
const timeouts = {};
function checkIp(operation, req, max) {
    let ipAr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let ip;
    if (Array.isArray(ipAr))
        ip = ipAr[0];
    else
        ip = ipAr.toString();
    ip = operation + ip;
    if (!ips[ip])
        ips[ip] = 0;
    ips[ip]++;
    if (ips[ip] > max) {
        if (!timeouts[operation]) {
            timeouts[operation] = setTimeout(() => {
                ips[ip] = 0;
                delete timeouts[operation];
            }, 60 * 60000);
        }
        return null;
    }
    return ip;
}
exports.checkIp = checkIp;
function onProcessError(req, resp, err) {
    resp.status(500).json({
        error: '500',
        message: 'Internal Server Error'
    });
    console.error(req.url, req.body, err);
}
exports.onProcessError = onProcessError;
function mysqlTime() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}
exports.mysqlTime = mysqlTime;
