import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { BookModel } from './book.model';
import { PendingPurchasesBook } from './pending-purchases-books.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private apiUrl = environment.api_url;

  constructor(private http: HttpClient) {}

  books: BookModel[] = [];

  $books = new Subject<BookModel[]>();
  getbooks() {
    const token = localStorage.getItem('token');

   

    this.http.get<BookModel[]>(`${this.apiUrl}/book`, ).subscribe({
      next: (value) => {
        this.books = value;
        this.$books.next(this.books);
      },
      error: (e) => {},
    });
  }

  createBook(book: any) {
    const token = localStorage.getItem('token');

   

    return this.http.post<BookModel>(`${this.apiUrl}/book`, book, );
  }

  reloadBook(id: string, book: BookModel) {
    let updated = this.books.map((v) => {
      if (v._id == id) {
        v = book;
      }
      return v;
    });
    this.books = updated;
    this.$books.next(this.books);
  }

  editBook(id: string, book: any) {
    const token = localStorage.getItem('token');

   

    return this.http.put<BookModel>(`${this.apiUrl}/book/${id}`, book,);
  }

  removeBook(id: string) {
    let value = this.books.filter((v) => v._id != id);
    this.books = value;
    this.$books.next(this.books);
  }

  deleteBook(id: string) {
    const token = localStorage.getItem('token');

   

    return this.http.delete<BookModel>(`${this.apiUrl}/book/${id}`,);
  }

  getPendingPurchases() {

   

    return this.http.get<PendingPurchasesBook[]>(
      `${this.apiUrl}/user-books/purchases/pendings`,
      
    );
  }
  verifyPendingPurchase(
    id: string,
    verified: boolean,
    rejectionReason: string
  ) {

   

    return this.http.patch<PendingPurchasesBook[]>(
      `${this.apiUrl}/user-books/purchase/${id}/verify`,
      {
        verified,
        rejectionReason,
      },
      
    );
  }
}
