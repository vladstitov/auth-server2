import {Request} from 'express';
import * as moment from 'moment';
import {createToken, encryptPassword, mysqlTime} from '../../utils/app-utils';
import {UserModel, VOUser} from '../login-model';
const uuidV1 = require('uuid/v1');

export async function loginUser(username: string, password: string, language: string): Promise<any> {
//console.log(email, hashed);

  password = encryptPassword(password);
  const user: VOUser = await UserModel.findOne({where: {username: username, password: password}, raw: true}) as VOUser;
  if (!user) {
    return {error: 'wrong', message: 'EMAIL_OR_PASSWORD_INCORRECT'};
  }

  if (!user.confirmed) {
    const diff = moment().diff(user.updatedAt, 'hours');
    return {error: 'confirmation', message: 'CONFIRMATION_REQUIRED', data: {diff}};
  }
  // console.log('login', user);

  const uid = user.uid;
  const email = user.email;
  const token = createToken({email, uid, language});
  const tokenID =  uuidV1();
  user.tokenID = tokenID;
  user.statusID = moment().format();
  user.status = 'logged_in';
  user.language = language;
  user.token = token;
  user.updatedAt =  mysqlTime();

  const update = await UserModel.update(user, {where: {id: user.id}});
  if(!update)  return {error: 'db', message: 'PLEASE_RE_LOGIN'};

    const toSend = {
      success: 'logged_in',
      data: {
        tokenID,
        uid,
        token,
        email
      }
    };
    return toSend;
}
