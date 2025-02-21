import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MembershipModel } from '../shared/models/membership.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(usuario: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { usuario, password });
  }
  // Método para iniciar sesión
  signin(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario`, body);
  }

  isPremium = false;
  user: any;
  // Método para obtener información del usuario
  getUserData() {
    this.http.get(`${this.apiUrl}/usuario/profile`).subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }
  getUserDataSuscribe() {
    const token = localStorage.getItem('token');

    return this.http.get(`${this.apiUrl}/usuario/profile`);
  }
}
