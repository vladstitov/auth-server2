import {UserModel, VOUser} from '../login-model';
import * as moment from 'moment';
import {createToken, encryptPassword, mysqlTime} from '../../utils/app-utils';
const uuidV1 = require('uuid/v1');

export async function resetPassword(tokenID: string, password: string) {

  const user: VOUser = await UserModel.findOne({where: {tokenID}, raw: true}) as VOUser;
  if (!user) return {error: 'not_exists', message: 'NOT_EXISTS'};

  if (user.status !== 'reset_sent') return {
    error: 'status_unknown',
    message: 'PLEASE_TRY_AGAIN_RESET_PASSWORD',
    data: user.status
  };

  const diff = moment().diff(user.updatedAt, 'hours');
  if (diff > 24) return {error: 'expired', message: 'RESET_PASSWORD_TOKEN_EXPIRED', data: {at: user.updatedAt, diff}};

  password = encryptPassword(password);
  // if(user.password === password) return {error: 'same', message: 'Please use another password'};
  const email = user.email;
  const uid = user.uid;
  const language = user.language;
  const token = createToken({uid, email, language});
  user.password = password;
  user.tokenID = uuidV1();
  user.token = token;
  user.status = 'new_password';
  user.statusID = moment().format();
  user.updatedAt =  mysqlTime();
  const update = await UserModel.update(user, {where: {id: user.id}});

  if (Array.isArray(update) && update[0]) return {success: 'new_password', message: 'PLEASE_LOGIN_WITH_NEW_PASSWORD'};

  console.error(' resetPassword error update  ' + tokenID);
  return {error: 'db', message: 'PLEASE_TRY_AGAIN'}

}

