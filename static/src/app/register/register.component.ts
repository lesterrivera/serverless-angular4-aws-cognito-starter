import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AlertService, AuthenticationService} from '../_services/index';
import {RegistrationUser} from '../_models/index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registrationUser: RegistrationUser;

  constructor(private alertService: AlertService,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.registrationUser = new RegistrationUser();
  }

  onRegister() {

    this.authenticationService.register(this.registrationUser)
      .then(result =>{
        this.router.navigate(['/confirm', result.user.username]);
      })
      .catch(err=>{
        this.alertService.error(err);
        console.log("result: " + err);
      });
  }

}
