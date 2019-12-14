import {Request} from 'express';
import {UserModel, VOUser} from '../login-model';
import * as moment from 'moment';

export async function logout(req: Request) {
  const userId = req.session.userID;
  const userUID = req.session.userUID;
  if(!userId || !userUID) return {error: 'no_user', message: 'PROBABLY_SESSION_EXPIRED'};
  const user: VOUser = await UserModel.findOne({where: {id:userId}, raw: true}) as VOUser;
  if(!user) return {error: 'no_user', message: 'NO_USER'};

  user.tokenID = null;
  user.status = 'logged_out';
  user.statusID =  moment().format();
  const update = await UserModel.update(user, {where: {id: user.id}});
  if (update) {
    req.session.destroy(function (err) {
      if (err) console.error(err);
    });
    return {success: 'logged_out', message: 'HAVE_A_NICE_DAY'};
  } else return {error: 'db', message: 'DB_ERROR_TRY_AGAIN'};
}
