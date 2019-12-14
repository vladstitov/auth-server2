import {UserModel, VOUser} from '../login-model';
import * as moment from 'moment';
const uuidV1 = require('uuid/v1');
import {sendResetPasswordEmail} from './send-emails';
import {createToken, mysqlTime} from '../../utils/app-utils';

export async function requestResetPassword(email, confirmUrl) {

  const user: VOUser = await UserModel.findOne({where: {email: email}, raw: true}) as VOUser;

  if (!user) return {error: 'not_exists', message: 'NOT_FOUND'};
  if(!user.confirmed) return {error: 'confirmation', message: 'PLEASE_CONFIRM_YOUR_EMAIL_FIRST'};

  if (user.status === 'reset_sent') {
    const diff = moment().diff(user.updatedAt, 'hours');
    const at = user.updatedAt;
    if (diff < 23) {
      return {error: 'reset_sent', message: 'RESET_PASSWORD_URL_SENT_TO_YOUR_EMAIL'};
    }
  }

  const tokenID = uuidV1();
  const uid = user.uid;
  const language = user.language;

  const token = createToken({uid, email, language});
  confirmUrl = confirmUrl + '?tokenID=' + tokenID + '&language=' + language;
  const sent = await sendResetPasswordEmail(email, confirmUrl, '', user.language);

  if (sent.accepted) {
    user.statusID = moment().format();
    user.status = 'reset_sent';
    user.tokenID = tokenID;
    user.token = token;
    user.updatedAt =  mysqlTime();
  } else return {error: 'send_email', message: 'CANT_SEND_EMAIL', data: sent};

  const update = await UserModel.update(user, {where: {id: user.id}});

  if (!update) return {error: 'db', message: 'PLEASE_TRY_AGAIN'};

  if (update[0]) return {success: 'email_sent', data: 'PLEASE_CHECK_EMAIL'};
  else {
    console.error('requestResetPassword update error ' + email);
    return {error: 'db', message: 'IGNORE_FIRST_EMAIL_AND_TRY_AGAIN'};
  }
}
