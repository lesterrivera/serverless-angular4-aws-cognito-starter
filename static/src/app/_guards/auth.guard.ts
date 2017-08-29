import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from '../_services/index';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authenticationService:AuthenticationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authenticationService.isLoggedIn()
      .then(result=>{
        if (result) {
          // logged in so return true
          return true;
        } else {
          // not logged in so redirect to login page with the return url
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          return false;
        }
      })
      .catch(err=>{
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
      })
  }
}

