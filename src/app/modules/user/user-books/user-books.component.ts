import { Component, OnInit } from '@angular/core';
import { UserBooksService } from '../services/user-books.service';
import { UserBookModel } from '../../../shared/models/user-book.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.scss'],
})
export class UserBooksComponent implements OnInit {
  bookId?: string;
  constructor(
    private userBookService: UserBooksService,
    private readonly route: ActivatedRoute
  ) {
    this.bookId = this.route.snapshot.queryParamMap.get('id') || '';
  }

  books: UserBookModel[] = [];
  ngOnInit() {
    this.userBookService.getUserBooksPurchaseds().subscribe({
      next: (value) => {
        this.books = value;
      },
      error(err) {
        console.error(err);
      },
    });
  }
}
