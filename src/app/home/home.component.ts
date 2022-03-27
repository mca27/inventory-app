import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false
  constructor(private authService: AuthService, private router: Router){
    if(this.authService.checkLogin()){
      this.isLoggedIn = true
    }else{
      this.isLoggedIn = false
    }

  }
  ngOnInit(): void {}
  goToLogin(){
    this.router.navigate(['auth/login']);

  }
}
