import {UserModel, VOUser} from '../login-model';
import * as moment from 'moment';

import {createToken, mysqlTime} from '../../utils/app-utils';
const uuidV1 = require('uuid/v1');

export async function confirmUser(tokenID: string) {

  const user: VOUser = await UserModel.findOne({where: {tokenID}, raw: true}) as VOUser;
  console.log('confirmUser user ' + tokenID);
  if (!user) return {error: 'not_exists', message: 'CONFIRM_NOT_EXISTS'};

  if (user.confirmed) {
    return {success: 'confirmed', message:'WAS_CONFIRMED',  data: {uid: user.uid}};
  }

  const diff = moment().diff(user.updatedAt, 'hours');
  if (diff > 24) {
    UserModel.destroy({where:{id:user.id}});
    return {error: 'expired', message: 'TOKEN_EXPIRED', data: {at: user.updatedAt, diff}};
  }

  const uid = user.uid;
  const email = user.email;
  const language = user.language;
  user.confirmed = moment().format();
  user.roles = 'user';
  user.status = 'confirmed';
  user.statusID = moment().format();
  user.updatedAt =  mysqlTime();
  let update = await UserModel.update(user, {where: {id: user.id}});
  if(!update) return {error:'db1_update', message: 'PLEASE_GO_TO_EMAIL_AND_TRY_AGAIN'};

  return {success: 'success', data :{tokenID}};

}
