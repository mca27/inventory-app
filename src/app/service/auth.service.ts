import { Injectable } from '@angular/core';
// import * as jwt from 'jsonwebtoken';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  authConfig = {
    _GLOBAL_TOKEN_FOR_TESTING: 'testtoken',
    AUTHENTICATION_SALT: '2CkW0ygTbcZquGDZKBa3',
    EXPIRES_IN: '24h',
  };

  isLoggedIn(): boolean {
    const isLoggedIn = this.checkLogin();
    console.log(isLoggedIn);
    return isLoggedIn ? true : false;
  }
  getToken() {
    return localStorage.getItem('access-token');
  }
  setLocalStorage(token:any) {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('access-token', `${token}`);

  }
  checkLogin() {
    return localStorage.getItem('loggedIn');
  }
  clearLocalStorage() {
    localStorage.removeItem('loggedIn');
  }
  // generateJWTToken(email: any){
  //   return jwt.sign({ _id: email }, this.authConfig.AUTHENTICATION_SALT, {
  //     expiresIn: this.authConfig.EXPIRES_IN,
  //   })
  // }
  base64url(source: any) {
    let encodedSource = CryptoJS.enc.Base64.stringify(source);

    encodedSource = encodedSource.replace(/=+$/, '');

    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
  }
  encodeToken(payload: any) {
    var header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    var encodedHeader = this.base64url(stringifiedHeader);

    var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(payload));
    var encodedData = this.base64url(stringifiedData);

    var token = encodedHeader + '.' + encodedData;
    return token
  }
  signToken(payload: any, key: string) {
    var secret = key;
    let token: any = this.encodeToken(payload);
    console.log("token s", token)
    var signature: any = CryptoJS.HmacSHA256(token, secret);
    signature = this.base64url(signature);

    var signedToken = token + '.' + signature;
    return signedToken;
  }
}
