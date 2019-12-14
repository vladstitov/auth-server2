import {decodeTokenSimple} from "../utils/app-utils";
import  axios from "axios";

export async function validateUser(token: string, session: string)
  :Promise<{valid?:boolean, expires?: number, error?: string, message?: string, uid?: string}> {
  const decoded = decodeTokenSimple(token);
  let url = decoded.body.oxValidationURI;
  if(!url)  return {error:'token', message: 'no url in token'};
    url += '?access_token=' + session;
  return isValidSession(url, decoded.header.kid);
}

export async function isValidSession(url: string, uid: string) {
  return new Promise(function (resolve, reject) {
    axios.get(url).then((res: any) => {
      res = res.data;
      resolve ({
        valid: res.valid,
        expires: res.expires_in,
        uid
      });
    }).catch(err => {
      err.response?  resolve( err.response.data): reject(err);
    })
  })
}

export async function whoami(url: string, bearer: string) {
  return axios({
    url,
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + bearer
    }
  }).then(res => res.data);
}



