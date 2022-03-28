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
    if (email === 'pradeep1yenkuwale@gmail.com' && password == 'Pradeep!43') {
      // const token = this.authService.signToken(this.user, this.authService.authConfig.AUTHENTICATION_SALT);
      // console.log("token", token);
      this.showError = false;
      this.errorMessage = '';
      const url = this.routeConstants.COMPLETE_URL + this.routeConstants.GENRATE_TOKEN
      this.requestService.create(url, this.user).subscribe(
        (response) => {
          this.showError = false;
          const userData = _.get(response, 'data', {});
          const token = _.get(response,"data.token", "");
          if(token){
            this.authService.setLocalStorage(token);
            this.router.navigate(['products']);

          }else{
            this.errorMessage = "Authentication Failed!!!";
            this.showError = true;
          }
        },
        (error) => {
          this.errorMessage = _.get(error, 'error.message', '');
          this.showError = true;
          console.log('Error in getting products data');
        }
      );

    } else {
      this.showError = true;
      this.errorMessage = 'Invalid user';
    }
  }
}
