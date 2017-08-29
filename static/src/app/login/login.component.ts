import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, AlertService } from '../_services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .then(user => {
        this.router.navigate([this.returnUrl]);
      })
      .catch(err => {
        console.log("result: " + err);
        if (err === 'User is not confirmed.') {
          console.log("redirecting");
          this.router.navigate(['/confirm', this.model.username]);
        } else if (err === 'User needs to set password.') {
          console.log("redirecting to set new password");
          this.router.navigate(['/changePassword']);
        } else if (err){
          console.log("No authentication");
          this.alertService.error(err);
        }
        this.loading = false;
      });

  }

}
