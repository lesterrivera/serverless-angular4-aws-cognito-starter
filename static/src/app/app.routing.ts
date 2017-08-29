import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResendComponent } from './resend/resend.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ForgotComponent } from './forgot/forgot.component';
import { Forgot2Component } from './forgot2/forgot2.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AuthGuard } from './_guards/index';

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'confirm/:username', component: ConfirmComponent},
  { path: 'resend', component: ResendComponent},
  { path: 'forgotPassword/:email', component: Forgot2Component},
  { path: 'forgotPassword', component: ForgotComponent},
  { path: 'changePassword', component: ChangepasswordComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }
];

