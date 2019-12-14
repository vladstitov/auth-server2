import {UserModel, VOUser} from '../login-model';
import * as moment from 'moment';
const uuidV1 = require('uuid/v1');
import {createToken, encryptPassword, mysqlTime} from '../../utils/app-utils';
import {sendConfirmationEmail} from './send-emails';

export async function registerUser(
  username: string,
  email: string,
  password: string,
  ip: string,
  confirmUrl: string,
  language: string
) {

  const user: VOUser = await UserModel.findOne({where: {username: username}, raw: true}) as any;
  if (user && user.confirmed) return {error: 'exists', message: 'PLEASE_LOGIN'};
  if (user) {
    const diff = moment().diff(user.updatedAt, 'hours');
    const at = user.updatedAt;
    if (diff < 23) {
      return {error: 'confirmation', message: 'CONFIRMATION_REQUIRED', data: diff};
    } else {
      await UserModel.destroy({where: {id: user.id}});
    }
  }

  password = encryptPassword(password);
  const tokenID = uuidV1();
  const uid = uuidV1();
  const token = createToken({uid, email, language});

  confirmUrl += '?tokenID=' + tokenID + '&language=' + language;

  let newUser: VOUser = {
    id:0,
    email: email,
    password: password,
    confirmed: null,
    roles: 'none',
    username,
    uid,
    status: 'created',
    tokenID,
    language,
    token,
    statusID: moment().format(),
    createdAt: mysqlTime(),
    updatedAt: mysqlTime()
  };

  const sent = await sendConfirmationEmail(email, confirmUrl, language);
  /*
accepted: [ 'uplight.ca@gmail.com' ],
*  rejected: [],
envelopeTime: 489,
messageTime: 290,
messageSize: 691,
response: '250 OK , completed',
envelope: { from: 'onlinevlad@yahoo.ca', to: [ 'uplight.ca@gmail.com' ] },
messageId: '<cdf44c23-ac94-0a97-2c5d-9009a5df606f@yahoo.ca>' }*/

  if (sent.accepted) {
    newUser.statusID = sent.messageId;
    newUser.status = 'email_sent';
  } else return {error: 'send', message: 'CANT_SEND_EMAIL', data: sent};

  const insert = await UserModel.create(<any>newUser).then((res: any) => {
    return res.get({plain: true})
  });
  if(insert) return {success: 'email_sent', data: insert, message:'EMAIL_SENT_TO_EMAIL'};
  else return {error:'db_update', message: 'EMAIL_SENT_BUT_NOT_VALID'};

}
