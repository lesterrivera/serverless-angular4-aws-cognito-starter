import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {environment} from "../../environments/environment";
import {AuthenticationService } from '../_services/index';

@Injectable()
export class MessageService {
  private apiUrl = environment.apiURL;
  private userToken;

  constructor(private http: Http,
              private authenticationService: AuthenticationService) {

    this.authenticationService.getUserToken()
      .then( result =>{
        this.userToken = result;
      });
  }

  getMessage() {
    return this.http.get(`${this.apiUrl}/api/message`, this.jwt())
      .map((response: Response) => response.json());
  }

  // private helper methods
  private jwt() {
    // create authorization header with jwt token
    let currentToken = this.userToken;
    if (currentToken) {
      let headers = new Headers({ 'Authorization': currentToken });
      headers.append('Content-Type', 'application/json');
      return new RequestOptions({ headers: headers });
    }
  }

  private jwtExx(): Promise<RequestOptions> | RequestOptions {
    // create authorization header with jwt token
    return this.authenticationService.getUserToken()
      .then( result =>{
        console.log('Retrieved user token: ' +result);
        let headers = new Headers({ 'Authorization': result });
        headers.append('Content-Type', 'application/json');
        return new RequestOptions({ headers: headers });
      })
      .catch( err=>{
        console.log('unable to retrieve user token');
        return new RequestOptions();
      });
  }
}
