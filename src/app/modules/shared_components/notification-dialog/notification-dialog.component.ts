import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../shared/notification.service';
import { NotificationModel } from '../../../shared/models/notification.model';
import { MaterialsModule } from '../../../materials/materials.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'notification-dialog',
  imports: [MaterialsModule, CommonModule],
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss'],
})
export class NotificationDialogComponent implements OnInit {
  constructor(
    private nofiticationService: NotificationService,
    private router: Router
  ) {}
  get notifications() {
    return this.nofiticationService.notifications.slice(0, 5);
  }

  ngOnInit() {
    // this.nofiticationService.getNotifications();
  }

  open(notification: NotificationModel) {
    switch (notification.type) {
      case 'BOOK_PURCHASED':
        this.router.navigate([`/app/books`], {
          queryParams: {
            id: notification.relatedId,
          },
        });
        break;
      case 'PAYMENT_PROCESSED':
        switch (notification.relatedModel) {
          case 'Book':
            this.router.navigate([`/app/books`], {
              queryParams: {
                id: notification.relatedId,
              },
            });
            break;
          case 'Membership':
            this.router.navigate([`/app/`], {});
            break;
          default:
            break;
        }

        break;
      case 'PAYMENT_ERROR':
        switch (notification.relatedModel) {
          case 'Book':
            this.router.navigate([`/app/buy/book/${notification.relatedId}`]);
            break;
          case 'Membership':
            this.router.navigate([`/app/buy/membership`], {});
            break;
          default:
            break;
        }

        break;
    }
  }
}
