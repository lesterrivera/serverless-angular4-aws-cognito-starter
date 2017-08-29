import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthenticationService, AlertService } from '../_services/index';

@Component({
  selector: 'app-resend',
  templateUrl: './resend.component.html',
  styleUrls: ['./resend.component.css']
})
export class ResendComponent implements OnInit {
  email: string;

  constructor(private router: Router,
              private alertService: AlertService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  resendCode() {
    this.authenticationService.resendCode(this.email)
      .then( result=>{
        this.router.navigate(['/confirm', this.email]);
      })
      .catch(err=>{
        this.alertService.error("Something went wrong...please try again");
        console.log(err);
      });
  }

}
