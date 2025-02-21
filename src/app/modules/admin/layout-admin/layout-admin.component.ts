import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MaterialsModule } from '../../../materials/materials.module';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialsModule, RouterLink],
  templateUrl: './layout-admin.component.html',
  styleUrl: './layout-admin.component.scss',
})
export class LayoutAdminComponent {
  constructor(private authService: AuthService, private router: Router) {
    authService.getUserData();
  }

  get user() {
    return this.authService.user;
  }

  logout() {
    localStorage.clear();
    this.authService.user = null;
    this.router.navigate(['']);
  }

  buttons = [
    {
      icon: 'home',
      text: 'Inicio',
      link: '/admin',
    },

    { icon: 'person', text: 'Doctores', link: 'usuarios' },
    {
      icon: 'assignment',
      text: 'Bitácora',
      link: 'bitacora',
    },
    {
      icon: 'backup',
      text: 'Base de datos',
      link: 'database',
    },
  ];
}
