import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import {environment} from "../../environments/environment";
import {AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserAttribute} from "amazon-cognito-identity-js";
import {RegistrationUser, NewPasswordUser} from '../_models/index';

@Injectable()
export class AuthenticationService {
  private userPool;

  constructor() {
    let poolData = {
      UserPoolId : environment.userPoolId,
      ClientId : environment.clientId
    };
    this.userPool = new CognitoUserPool(poolData);
  }

  /**
   * Login the user via AWS Cognito
   * @param {string} username
   * @param {string} password
   * @returns {Promise<any>}
   */
  login(username: string, password: string) {
    return new Promise((resolve, reject)=> {
      let authenticationData = {
        Username: username,
        Password: password,
      };
      let authenticationDetails = new AuthenticationDetails(authenticationData);

      let userData = {
        Username: username,
        Pool: this.userPool
      };
      let cognitoUser = new CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
        newPasswordRequired: function (userAttributes, requiredAttributes) {
          reject('User needs to set password.')
        },
        onSuccess: function (result) {
          let user = {
            name: 'user',
            token:''
          };

          /* Use the idToken for Logins Map when Federating User Pools with Cognito Identity or
           * when passing through an Authorization Header to an API Gateway Authorizer
           */
          user.token = result.getIdToken().getJwtToken();
          localStorage.setItem('currentUser', JSON.stringify(user));

          resolve(result);
        },
        onFailure: function (err) {
          reject(err);
        }
      });
    });
  }

  /**
   * Logout the user from AWS Cognito
   * @returns {Promise<any>}
   */
  logout() {
    return new Promise((resolve, reject)=>{
      if (this.userPool != null){
        const cognitoUser = this.userPool.getCurrentUser();
        if (cognitoUser != null){
          cognitoUser.signOut();
        }
      }
      resolve("logging out successful");
    });
  }

  /**
   * Check to see if the user is already logged in
   * @returns {Promise<any>}
   */
  isLoggedIn() {
    return new Promise((resolve, reject)=>{
      let cognitoUser = this.userPool.getCurrentUser();

      if (cognitoUser != null) {
        cognitoUser.getSession(function (err, session) {
          if (err) {
            reject(false);
          }
          else {
            resolve(session.isValid());
          }
        });
      } else {
        reject(false);
      }
    });

  }

  /**
   * Register a user to AWS Cognito
   * @param {RegistrationUser} user
   * @returns {any}
   */
  register(user: RegistrationUser): any {
    return new Promise((resolve, reject)=>{
      let attributeList = [];

      let dataEmail = {
        Name: 'email',
        Value: user.email
      };
      attributeList.push(new CognitoUserAttribute(dataEmail));

      let poolData = {
        UserPoolId : environment.userPoolId,
        ClientId : environment.clientId
      };
      let userPool = new CognitoUserPool(poolData);

      userPool.signUp(user.email, user.password, attributeList, null, function (err, result) {
        if (err) {
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Confirm the registration of the user in AWS Cognito
   * @param {string} username
   * @param {string} confirmationCode
   * @returns {Promise<any>}
   */
  confirmRegistration(username: string, confirmationCode: string) {
    return new Promise((resolve, reject)=>{
      let userData = {
        Username: username,
        Pool: this.userPool
      };

      let cognitoUser = new CognitoUser(userData);

      cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

  }

  /**
   * Resend the confirmation code
   * @param {string} username
   * @returns {Promise<any>}
   */
  resendCode(username: string) {
    return new Promise((resolve, reject)=>{
      let userData = {
        Username: username,
        Pool: this.userPool
      };

      let cognitoUser = new CognitoUser(userData);

      cognitoUser.resendConfirmationCode(function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });

    });
  }

  /**
   * Self-service change of password for a user in AWS Cognito
   * @param {NewPasswordUser} newPasswordUser
   * @returns {Promise<any>}
   */
  changePassword(newPasswordUser: NewPasswordUser) {
    return new Promise((resolve, reject)=>{
      let authenticationData = {
        Username: newPasswordUser.username,
        Password: newPasswordUser.existingPassword,
      };
      let authenticationDetails = new AuthenticationDetails(authenticationData);

      let userData = {
        Username: newPasswordUser.username,
        Pool: this.userPool
      };

      console.log("AuthenticationService: Params set...Authenticating the user");
      let cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        newPasswordRequired: function (userAttributes, requiredAttributes) {
          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.

          // the api doesn't accept this field back
          delete userAttributes.email_verified;
          cognitoUser.completeNewPasswordChallenge(newPasswordUser.password, requiredAttributes, {
            onSuccess: function (result) {
              resolve( userAttributes);
            },
            onFailure: function (err) {
              reject(err);
            }
          });
        },
        onSuccess: function (result) {
          resolve(result);
        },
        onFailure: function (err) {
          reject(err);
        }
      });
    });
  }

  /**
   * Recover account after lost password in AWS Cognito
   * @param {string} username
   * @returns {Promise<any>}
   */
  forgotPassword(username: string) {
    return new Promise((resolve, reject)=>{
      let userData = {
        Username: username,
        Pool: this.userPool
      };

      let cognitoUser = new CognitoUser(userData);

      cognitoUser.forgotPassword({
        onSuccess: function () {
          resolve();
        },
        onFailure: function (err) {
          reject(err.message);
        },
        inputVerificationCode() {
          resolve();
        }
      });
    });
  }

  /**
   * Complete the recover account after lost password in AWS cognito
   * @param {string} email
   * @param {string} verificationCode
   * @param {string} password
   * @returns {Promise<any>}
   */
  confirmNewPassword(email: string, verificationCode: string, password: string) {
    return new Promise((resolve, reject)=>{
      let userData = {
        Username: email,
        Pool: this.userPool
      };

      let cognitoUser = new CognitoUser(userData);

      cognitoUser.confirmPassword(verificationCode, password, {
        onSuccess: function () {
          resolve();
        },
        onFailure: function (err) {
          reject(err.message);
        }
      });
    });
  }

  /**
   * Get the user token for the current user
   * @returns {Promise<any>}
   */
  getUserToken() {
    return new Promise((resolve, reject) => {
      let currentUser = this.userPool.getCurrentUser();
      currentUser.getSession(function(err, session) {
        if (err) {
          reject(err);
          return;
        }
        resolve(session.getIdToken().getJwtToken());
      });
    });
  }
}
