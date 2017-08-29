import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, AlertService } from '../_services/index';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  email: string;

  constructor(private router: Router,
              private alertService: AlertService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  onForgotPasswordStep1() {
    this.authenticationService.forgotPassword(this.email)
      .then(result=>{
        this.router.navigate(['/forgotPassword', this.email]);
      })
      .catch(err=>{
        this.alertService.error(err);
      });
  }

}
