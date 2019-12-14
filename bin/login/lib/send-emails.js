"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const config = require('../../server-config').serverConfig;
const fs = require("fs");
const path = require("path");
let transport;
if (config.email) {
    transport = nodemailer.createTransport({
        service: config.email.service,
        auth: {
            user: config.email.user,
            pass: config.email.pass,
        },
        debug: false,
    });
}
async function sendResetPasswordEmail(email, confirmUrl, userName, language) {
    if (!language)
        language = 'en';
    const filename = './etc/reset_' + language + '.htm';
    let message = fs.readFileSync(path.resolve(filename), 'utf8');
    message = message.replace('{{userName}}', userName)
        .replace('{{confirmUrl}}', confirmUrl);
    const mailOptions = {
        from: config.email.from,
        to: email,
        subject: config.email.company + ' Reset password request',
        html: message
    };
    console.log('sendReset password ');
    return transport.sendMail(mailOptions);
}
exports.sendResetPasswordEmail = sendResetPasswordEmail;
async function sendConfirmationEmail(email, confirmUrl, language) {
    if (!language)
        language = 'en';
    const filename = './etc/confirm_' + language + '.htm';
    let message = fs.readFileSync(path.resolve(filename), 'utf8');
    message = message.replace('{{confirmUrl}}', confirmUrl);
    const mailOptions = {
        from: config.email.from,
        to: email,
        subject: config.email.company + ' Registration request',
        html: message
    };
    console.log('sendConfirmationEmail ');
    return transport.sendMail(mailOptions);
}
exports.sendConfirmationEmail = sendConfirmationEmail;
function sendNotificationEmai(email, subject, message, language = 'en') {
    const mailOptions = {
        from: email.from,
        to: email,
        subject: 'Registration request',
        text: message
    };
    console.log('sendConfirmationEmail ');
    return transport.sendMail(mailOptions);
}
exports.sendNotificationEmai = sendNotificationEmai;
