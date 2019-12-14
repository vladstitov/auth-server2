import axios from 'axios';
import {Application, Request, Response, Router} from "express";

import {
  checkIp, decodeToken, decodeTokenSimple,
  decryptCTR,
  decryptCustom,
  encryptCTR,
  encryptCustom,
  isEmailValid,
  onProcessError
} from '../utils/app-utils';

import {getLoggedInUserByTokenId, requestResetPassword, VOUserSession} from './lib';
import {logout} from './lib';
import {loginUser} from './lib';
import {registerUser} from './lib';
import {confirmUser} from './lib';
import {resetPassword} from './lib';
import * as express from 'express';

import {serverConfig} from '../server-config';
import {UserModel, VOUser} from './login-model';
import * as moment from 'moment';


export const  router: Router = express.Router();

  router.get('/api/auth/get-login-user/:tokenID', function (req: Request, resp: Response) {
      const tokenId = req.params.tokenID;

      getLoggedInUserByTokenId(tokenId)
        .then((res) => {
          resp.json(res);
        })
        .catch(err => onProcessError(req, resp, err));
    });

router.get("/api/auth/reset-password-token/", function (req: Request, resp: Response) {
  if (serverConfig.blockIPonAttempt) {
    let ip = checkIp('resetPasswordToken', req, serverConfig.blockIPonAttempt);
    if (!ip) {
      resp.json({error: 'annoying', message: 'Too many requests. Please try later'});
      return;
    }
  }

  let tokenID = req.query.tokenID;

  if(!tokenID) {
    resp.json({error: 'tokenID'});
    return;
  }

  UserModel.findOne({where:{tokenID}}).then((user: VOUser) => {
    if(user) {
      const diff = moment().diff(user.updatedAt, 'hours');
      if (diff > 24) resp.redirect(serverConfig.redirects.errorRestPasswordExpired);
      else resp.redirect(serverConfig.redirects.resetPassword + tokenID);
    } else resp.redirect(serverConfig.redirects.errorRestPasswordInvalidToken);
  }).catch(err => onProcessError(req, resp, err));

});

router.post("/api/auth/reset-password-confirm", function (req: Request, resp: Response) {
    if (serverConfig.blockIPonAttempt) {
      let ip = checkIp('resetConfirm', req, serverConfig.blockIPonAttempt);
      if (!ip) {
        resp.json({error: 'annoying', message: 'Too many requests. Please try later'});
        return;
      }
    }

      let password = req.body.password;
      let tokenID = req.body.tokenID;

      if(!password || !tokenID) {
        resp.json({error: 'tokenID'});
        return;
      }

      resetPassword(tokenID, password)
        .then(res => {
          resp.json(res);
        })
        .catch(err => onProcessError(req, resp, err));

    });


  router.post('/api/auth/reset-password', function (req: Request, resp: Response) {

    if (serverConfig.blockIPonAttempt) {
      let ip = checkIp('resetPassword', req, serverConfig.blockIPonAttempt);
      if (!ip) {
        resp.json({error: 'annoying', message: 'PLEASE_TRY_IN_ONE_HOUR'});
        return;
      }
    }

    let email = req.body.email;
    let confirmUrl = serverConfig.resetPasswordUrl;
    if(!email || !confirmUrl) {
      resp.json({error: 'url-required'});
      return;
    }
    // let emailE = encryptCTR(email);
   // let host = req.get('host');
   //  let confirmUrl = req.protocol + '://' + req.get('host') + '/user/confirm-reset-password';

    requestResetPassword(email, confirmUrl)
      .then(res => {
        resp.json(res)
      })
      .catch(err => onProcessError(req, resp, err));
  });

  router.post('/api/auth/logout', function (req: Request, resp: Response) {
      logout(req)
        .then(res => {
          req.session = null;
          req.sessionID = null;
          resp.json(res)
        })
        .catch(err => onProcessError(req, resp, err));
  });


  router.post('/api/auth/login',function (req: Request, resp: Response) {

    if (serverConfig.blockIPonAttempt) {
      let ip = checkIp('login', req, serverConfig.blockIPonAttempt);
      if (!ip) {
        resp.json({error: 'annoying', message: 'PLEASE_TRY_IN_ONE_HOUR'});
        return;
      }
    }

    const email = req.body.email;
    let password = req.body.password;
    const language = req.body.language;

    loginUser(email, password, language)
      .then(res => {
         resp.json(res)
      })
      .catch(err => onProcessError(req, resp, err));

  });


  router.post('/api/auth/register', function (req: Request, resp: Response) {
    let ip = '';
    if (serverConfig.blockIPonAttempt) {
      ip = checkIp('register', req, serverConfig.blockIPonAttempt);
      if (!ip) {
        resp.json({error: 'annoying', message: 'PLEASE_TRY_IN_ONE_HOUR'});
        return;
      }
    }

    let email = req.body.email;
    if (!isEmailValid(email)) {
      resp.json({ error:'email', message: 'EMAIL_INVALID'});
      return;
    }

    let password = req.body.password;
    const language = req.body.language;

    let deviceid = req.headers['user-agent'];
    let confirmUrl = serverConfig.confirmEmailUrl;
    registerUser(email, email, password, ip, confirmUrl, language)
      .then(res => resp.json(res))
      .catch(err => onProcessError(req, resp, err))

  });

  router.get('/api/auth/confirm-email', function (req: Request, resp: Response) {
    const tokenID = req.query.tokenID;
    const language = req.query.language;

    console.log(' confirm email' + tokenID);
    // uid = decryptCTR(uid);
    if (!tokenID) {
      resp.end('hacker');
      return;
    }

    if (serverConfig.blockIPonAttempt) {
      let ip = checkIp('confirmEmail', req, serverConfig.blockIPonAttempt);
      if (!ip) {
        resp.json({error: 'annoying', message: 'PLEASE_TRY_IN_ONE_HOUR'});
        return;
      }
    }

    confirmUser(tokenID)
      .then(res => {
      //  const app = /auth-client;

        if(res.success){
          resp.redirect(serverConfig.redirects.confirmEmailSuccess);
        } else resp.redirect(serverConfig.redirects.confirmEmailError + res.message)
      })
      .catch(err => onProcessError(req, resp, err))
  })


