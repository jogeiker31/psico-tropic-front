import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBookComponent } from './create-book/create-book.component';
import { BooksService } from './books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  constructor(
    private matDialog: MatDialog,
    private bookService: BooksService
  ) {}

  ngOnInit() {
    this.bookService.getbooks();
  }

  get books() {
    return this.bookService.books;
  }

  create() {
    this.matDialog.open(CreateBookComponent);
  }
}
