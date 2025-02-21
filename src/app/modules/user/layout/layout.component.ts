import {
  ChangeDetectorRef,
  Component,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialsModule } from '../../../materials/materials.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostulationComponent } from '../create-postulation/create-postulation.component';
import { GenericDialogComponent } from '../../../dialogs/generic-dialog/generic-dialog.component';
import { UsersService } from '../../admin/users/users.service';
import { NotificationDialogComponent } from '../../shared_components/notification-dialog/notification-dialog.component';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialsModule,
    NotificationDialogComponent,
  ],

  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    private nofiticationService: NotificationService,
    private dialog: MatDialog
  ) {
    authService.getUserData();
    nofiticationService.getNotifications();
  }

  get user() {
    return this.authService.user;
  }
  get isPremium() {
    return this.authService.isPremium;
  }
  get notifications() {
    return this.nofiticationService.notifications;
  }

  logout() {
    this.authService.user = null;
    localStorage.clear();
    this.router.navigate(['']);
  }

  postulation() {}

  buttons = [
    {
      icon: 'home',
      text: 'Inicio',
      link: '/app',
    },

    {
      icon: 'medication',
      text: 'Medicamentos',
      link: 'medicamentos',
    },
    {
      icon: 'medical_information',
      text: 'Compras',
      link: 'compras',
    },
  ];
}
