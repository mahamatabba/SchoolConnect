import { Routes } from '@angular/router';
import { HomeComponent } from './Home/home/home.component';
import { AuthentificationComponent } from './auth/authentification/authentification.component';
import { SidebarComponent } from './Admin/sidebar/sidebar.component';
import { AdminComponent } from './Admin/admin/admin.component';
import { RoleGuard } from './role-guard.guard';
import { ManagementClasseComponent } from './classe/management-classe/management-classe.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'login', component: AuthentificationComponent },
  {path: 'side', component: SidebarComponent},
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RoleGuard],
    data: { role: 'Administrator' },
  },
    {path: 'classe', component: ManagementClasseComponent},
];
