import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private http: HttpClient) {
    this.getUsers();
  }

  users: any[] = [];

  $users = new Subject<any>();

  getUsers() {
    this.http.get<any[]>(`${environment.api_url}/usuario`).subscribe({
      next: (value) => {
        this.users = value;
        this.$users.next(this.users);
      },
      error: (e) => {},
    });
  }

  createDoctor(data: any) {
    return this.http.post(`${environment.api_url}/usuario`, data);
  }

  deleteDoctor(_id: any) {
    return this.http.delete(`${environment.api_url}/usuario/${_id}`);
  }
  editDoctor(_id: any, data: any) {
    return this.http.patch(`${environment.api_url}/usuario/${_id}`, data);
  }
}
