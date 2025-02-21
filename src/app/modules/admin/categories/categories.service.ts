import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = environment.api_url;

  constructor(private http: HttpClient) {
    this.getCategories();
  }

  categories: any[] = [];

  $categories = new Subject<any>();

  getCategories() {
    const token = localStorage.getItem('token');

   

    this.http.get<any[]>(`${this.apiUrl}/categories`, ).subscribe({
      next: (value) => {
        console.log(value);
        this.categories = value;
        this.$categories.next(this.categories);
      },
      error: (e) => {},
    });
  }

  addCategory(value: any) {
    this.categories.push(value);
    this.$categories.next(this.categories);
  }

  updateCategory(value: any) {
    this.categories = this.categories.map((item) => {
      if (item._id == value._id) {
        return value;
      } else {
        return item;
      }
    });
    this.$categories.next(this.categories);
  }

  createCategory(data: any) {
    const token = localStorage.getItem('token');

   

    return this.http.post<any>(`${this.apiUrl}/categories`, data, );
  }

  update(id: string, data: any) {
    const token = localStorage.getItem('token');

   

    return this.http.put<any>(`${this.apiUrl}/categories/${id}`, data,);
  }
}
