import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { ROUTES } from './app.routing';

import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { AlertComponent } from './alert/alert.component';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, MessageService } from './_services/index';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResendComponent } from './resend/resend.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { Forgot2Component } from './forgot2/forgot2.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ResendComponent,
    ConfirmComponent,
    ForgotComponent,
    ChangepasswordComponent,
    Forgot2Component,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthGuard,
    AlertService,
    AuthenticationService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
