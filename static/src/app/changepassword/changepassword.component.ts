import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthenticationService, AlertService } from '../_services/index';
import { NewPasswordUser } from '../_models/index';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  registrationUser: NewPasswordUser;

  constructor(private router: Router,
              private alertService: AlertService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.registrationUser = new NewPasswordUser();
  }

  onChangePassword() {
    console.log(this.registrationUser);
    this.authenticationService.changePassword(this.registrationUser)
      .then(result=>{
        this.router.navigate(['/home']);
      })
      .catch(err=>{
        this.alertService.error(err);
        // this.errorMessage = err;
        console.log("result: " + err);
      });
  }

}
