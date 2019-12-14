import {Request, Response} from "express";
import * as crypto from 'crypto';
import * as cryptojs from 'crypto-js';
import * as fs from 'fs';
import * as path from 'path';
import * as JWT from 'jsonwebtoken';
import {serverConfig} from '../server-config';
import * as moment from 'moment';
const atob = require('atob');


const SHA256 = cryptojs.SHA256;

var privateKEY = fs.readFileSync(path.resolve('./etc/private.key'), 'utf8');
var publicKEY = fs.readFileSync(path.resolve('./etc/public.key'), 'utf8');

const issuer = serverConfig.token.issuer;
const subject = serverConfig.token.subject;
const audience = serverConfig.token.audience;
const algorithm = serverConfig.token.algorithm;
const expiresIn = serverConfig.token.expiresIn;

export function createToken(payload: { uid: string, email: string, language: string }) {

  const signOptions = {
    issuer,
    subject,
    audience,
    expiresIn,
    algorithm
  };
  return JWT.sign(payload, privateKEY, signOptions);
}

export function decodeTokenSimple(token: string) {
  const ar = token.split('.');
  ar.pop();
  const header = JSON.parse(atob(ar[0]));
  const body = JSON.parse(atob(ar[1]));
  const signature = ar[2];
  return {header, body};
}

export function decodeToken(token) {
  return JWT.decode(token, {complete: true});
}


export function verifyToken(token: string) {
  var verifyOptions = {
    issuer,
    subject,
    audience,
    expiresIn,
    algorithm: [algorithm]
  };
  return JWT.verify(token, publicKEY);
}

export function encryptPassword(pass) {
  return SHA256(pass).toString();
}

//const hri = require('human-readable-ids').hri;
const algorithmCTR = 'aes-256-ctr',
  algorithmGSM = 'aes-256-gcm',
  PASSWORD = '3zTvzr3p67VC61jmV54rIYu1545x4TlY';
export const EXPIRATION_TIME: number = 180;

export function hashPassword(password, callBack: Function) {
  crypto.pbkdf2(password, PASSWORD, 9, 32, 'sha512', (err, derivedKey) => {
    if (err) callBack({error: 'error'});
    else callBack({hash: derivedKey.toString('hex')});  // '3745e48...aa39b34'
  });
}


export function isEmailValid(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

export function encryptCustom(email, password): string {
  let n = password.length + '';
  if (n.length == 1) n = '0' + n;
  return n + password + email;
}

export function decryptCustom(url: string): { email: string, password: string } {
  let index = +url.substr(0, 2);
  if (isNaN(index)) return null;
  url = url.substr(2);

  let email = url.substr(index);
  let password = url.substr(0, index);
  return {
    email: email,
    password: password
  }
}

export function encryptCTR(text) {
  var cipher = crypto.createCipher(algorithmCTR, PASSWORD)
  var crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex');
  return crypted;
}


export function decryptCTR(text) {
  var decipher = crypto.createDecipher(algorithmCTR, PASSWORD);
  var dec;
  try {
    dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
  } catch (e) {
    console.error(e);
  }

  return dec;
}

let ips = {};
const timeouts = {};

export function checkIp(operation: string, req: Request, max: number): string {

  let ipAr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let ip: string;
  if (Array.isArray(ipAr)) ip = ipAr[0];
  else ip = ipAr.toString();
  ip = operation + ip;

  if (!ips[ip]) ips[ip] = 0;
  ips[ip]++;
  if (ips[ip] > max) {
    if (!timeouts[operation]) {
      timeouts[operation] =  setTimeout(() => {
        ips[ip] = 0;
        delete timeouts[operation];
      }, 60 * 60000);
    }

    return null;
  }
  return ip;
}

export function onProcessError(req: Request, resp: Response, err) {
  resp.status(500).json({
    error: '500',
    message: 'Internal Server Error'
  });
  console.error(req.url, req.body, err)
}


export function mysqlTime() {
  return moment().format('YYYY-MM-DD HH:mm:ss');

}
