import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { AuthenticationService, AlertService } from '../_services/index';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit, OnDestroy {
  confirmationCode: string;
  email: string;
  private sub: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.email = params['username'];

    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onConfirmRegistration() {

    this.authenticationService.confirmRegistration(this.email, this.confirmationCode)
      .then(result=>{
        this.router.navigate(['/home']);
      })
      .catch(err=>{
        this.alertService.error(err);
        console.log("message: " + err);
      });
  }

}
