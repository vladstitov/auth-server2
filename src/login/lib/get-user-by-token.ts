import {UserModel, VOUser} from '../login-model';
import * as moment from 'moment';

export interface VOUserSession {
  uid: string;
  language: string;
  roles: string;
  email: string;
}

export async function getLoggedInUserByTokenId(tokenID: string) {
  const user: VOUser = await UserModel.findOne({where: {tokenID}}) as VOUser;
  if (user && user.status === 'logged_in') {
    const diff = moment().diff(user.updatedAt, 'minutes');
    if (diff > 5) return {error: 'expired', message: 'TOKEN_EXPIRED_PLEASE_RE_LOGIN'};
    return {
      success: 'success', data: {
        uid: user.uid,
        language: user.language,
        roles: user.roles,
        email: user.email
      }
    }
  }

  return {error: 'unknown', message: 'PLEASE_RE_LOGIN'};

}
