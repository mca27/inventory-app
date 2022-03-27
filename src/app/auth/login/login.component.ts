import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouteConstants } from '../../constants/route-counstants';
import { RequestService } from '../../service/requests.service';
import * as _ from 'lodash';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalOptions,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: any;
  showError: boolean = false;
  errorMessage: any;
  constructor(
    private routeConstants: RouteConstants,
    private requestService: RequestService,
    private authService: AuthService,
    private router: Router
  ) {}

  // Call the Products API once the Compoment gets initialized
  ngOnInit(): void {
    this.user = {};
    this.authService.clearLocalStorage();
  }
  login() {
    console.log('user', this.user);
    const { email, password } = this.user;
    if (email === 'pradeep1yenkuwale@gmail.com' && password == 'pradeep143') {
      this.showError = false;
      this.errorMessage = '';
      this.authService.setLocalStorage()
      this.router.navigate(['products']);

    } else {
      this.showError = true;
      this.errorMessage = 'Invalid user';
    }
  }
}
