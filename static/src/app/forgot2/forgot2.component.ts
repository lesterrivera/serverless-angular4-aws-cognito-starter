import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, AlertService } from '../_services/index';

@Component({
  selector: 'app-forgot2',
  templateUrl: './forgot2.component.html',
  styleUrls: ['./forgot2.component.css']
})
export class Forgot2Component implements OnInit, OnDestroy {
  verificationCode: string;
  email: string;
  password: string;
  private sub: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.email = params['email'];

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onForgotPasswordStep2() {
    this.authenticationService.confirmNewPassword(this.email, this.verificationCode, this.password)
      .then(result=>{
        this.router.navigate(['/login', this.email]);
      })
      .catch(err=>{
        this.alertService.error(err);
      });
  }


}
