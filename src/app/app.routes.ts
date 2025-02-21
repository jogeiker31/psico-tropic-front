import { Routes } from '@angular/router';
import { RegistroComponent } from './auth/registro/registro.component';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './modules/user/layout/layout.component';
import { HomeComponent } from './modules/home/home.component';
import { LayoutAdminComponent } from './modules/admin/layout-admin/layout-admin.component';
import { inject } from '@angular/core';
import { authGuard } from './auth.guard';
import { adminGuard } from './admin.guard';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { referentGuard } from './referent.guard';
import { ReferentLayoutComponent } from './modules/referent/referent-layout/referent-layout.component';
import { ReferentModule } from './modules/referent/referent.module';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [authGuard],
    loadChildren: () => UserModule,
  },
  {
    path: 'admin',
    component: LayoutAdminComponent,
    canActivate: [adminGuard],
    loadChildren: () => AdminModule,
  },
  {
    path: 'referent',
    component: ReferentLayoutComponent,
    canActivate: [referentGuard],
    loadChildren: () => ReferentModule,
  },
];
