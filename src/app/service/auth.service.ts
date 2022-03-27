import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

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
}
