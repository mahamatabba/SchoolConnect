import { Routes } from '@angular/router';
import { HomeComponent } from './Home/home/home.component';
import { AuthentificationComponent } from './auth/authentification/authentification.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'login', component: AuthentificationComponent },
];
