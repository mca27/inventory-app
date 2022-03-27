import { Injectable } from '@angular/core';
import * as jwt from 'jsonwebtoken';
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
    return isLoggedIn? true: false;
  }
  setLocalStorage() {
    localStorage.setItem('loggedIn', 'true');
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
}
