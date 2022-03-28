import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // check if the user is logged in
  isLoggedIn(): boolean {
    const isLoggedIn = this.checkLogin();
    console.log(isLoggedIn);
    return isLoggedIn ? true : false;
  }
  
  // get token from local storage
  getToken() {
    return localStorage.getItem('access-token');
  }

  // update local storage
  setLocalStorage(token:any) {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('access-token', `${token}`);

  }
  checkLogin() {
    return localStorage.getItem('loggedIn');
  }

  // clear local storage after user logout
  clearLocalStorage() {
    localStorage.removeItem('loggedIn');
  }
}
