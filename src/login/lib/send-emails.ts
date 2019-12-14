import * as nodemailer from 'nodemailer';

const config = require('../../server-config').serverConfig;
import * as fs from 'fs';
import * as path from 'path';

let transport;

if (config.email) {
  transport = nodemailer.createTransport({
    // host: 'smtp.mail.yahoo.ca',
    // port: 465,
    // secure: false,
    service: config.email.service, // 'yahoo',
    auth: {
      user: config.email.user, // 'onlinevlad@yahoo.ca',
      pass: config.email.pass, // 'XZsawq@!'
    },
    debug: false,
    //  logger: true
  });
}

export async function sendResetPasswordEmail(email, confirmUrl: string, userName: string, language: string) {
  if(!language) language = 'en';

  const filename = './etc/reset_' + language + '.htm';
  let message: string = fs.readFileSync(path.resolve(filename), 'utf8');
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

export async function sendConfirmationEmail(email, confirmUrl: string, language: string) {
  if(!language) language = 'en';
  const filename = './etc/confirm_' + language + '.htm';
  let message: string = fs.readFileSync(path.resolve(filename), 'utf8');
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

export function sendNotificationEmai(email, subject, message, language = 'en') {

  const mailOptions = {
    from: email.from,
    to: email,
    subject: 'Registration request',
    text: message
  };

  console.log('sendConfirmationEmail ');
  return transport.sendMail(mailOptions);
}


