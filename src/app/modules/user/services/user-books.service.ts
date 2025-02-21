import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookModel } from '../../admin/books/book.model';
import { Subject } from 'rxjs';
import { UserBookModel } from '../../../shared/models/user-book.model';
import { PendingPurchasesBook } from '../../admin/books/pending-purchases-books.model';

@Injectable({
  providedIn: 'root',
})
export class UserBooksService {
  private apiUrl = environment.api_url;
  private token = localStorage.getItem('token');
  constructor(private http: HttpClient) {}

  books: BookModel[] = [];

  $books = new Subject<BookModel[]>();
  getbooks() {
    this.http.get<BookModel[]>(`${this.apiUrl}/book`).subscribe({
      next: (value) => {
        this.books = value;
        this.$books.next(this.books);
      },
      error: (e) => {},
    });
  }

  buy(_id: string) {
    return this.http.post<any>(`${this.apiUrl}/user-books`, { book: _id });
  }

  getUserBookById(id: string) {
    return this.http.get<UserBookModel>(`${this.apiUrl}/user-books/${id}`);
  }
  getUserBooksPurchaseds() {
    return this.http.get<UserBookModel[]>(
      `${this.apiUrl}/user-books/purchases/user`
    );
  }

  getUserBookPurchaseData(id: string) {
    return this.http.get<PendingPurchasesBook>(
      `${this.apiUrl}/user-books/purchases/byUserBook/${id}`
    );
  }
  patchUserBookPurchaseData(id: string, data: any) {
    return this.http.patch<PendingPurchasesBook>(
      `${this.apiUrl}/user-books/purchase/${id}`,
      data
    );
  }
  createUserBook(data: any) {
    return this.http.post(`${this.apiUrl}/user-books/purchase`, data);
  }
}
