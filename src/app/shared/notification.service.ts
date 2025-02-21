import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { NotificationModel } from './models/notification.model';



@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  notifications: NotificationModel[] = [];
  getNotifications() {
    // this.http
    //   .get<NotificationModel[]>(`${environment.api_url}/notifications  `)
    //   .subscribe({
    //     next: (value) => {
    //       this.notifications = value.slice(0, 5);
    //     },
    //   });
  }
}
