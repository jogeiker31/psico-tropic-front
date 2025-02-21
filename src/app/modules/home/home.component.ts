import { Component } from '@angular/core';
import { UserBooksService } from '../user/services/user-books.service';
import { UserBookModel } from '../../shared/models/user-book.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private userBookService: UserBooksService,
    private authService: AuthService
  ) {}

  get isPremium() {
    return this.authService.isPremium;
  }

  books: UserBookModel[] = [];

  ngOnInit() {
    this.userBookService.getUserBooksPurchaseds().subscribe({
      next: (value) => {
        this.books = value.slice(0, 5);
      },
      error(err) {
        console.error(err);
      },
    });
  }
}
