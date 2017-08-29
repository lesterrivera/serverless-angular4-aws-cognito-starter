import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {environment} from "../../environments/environment";
import {AuthenticationService } from '../_services/index';

@Injectable()
export class MessageService {
  private apiUrl = environment.apiURL;

  constructor(private http: Http,
              private authenticationService: AuthenticationService) { }

  getMessage() {
    return this.http.get(`${this.apiUrl}/api/message`, this.jwt())
      .map((response: Response) => response.json());
  }

  // private helper methods
  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': currentUser.token });
      headers.append('Content-Type', 'application/json');
      return new RequestOptions({ headers: headers });
    }
  }
}
