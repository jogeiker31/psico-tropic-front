import { Component, Input, OnInit } from '@angular/core';
import { Book, UserBookModel } from '../../../../shared/models/user-book.model';
import { MatDialog } from '@angular/material/dialog';
import { BookViewComponent } from '../book-view/book-view.component';

@Component({
  selector: 'user-book-card',
  templateUrl: './user-book-card.component.html',
  styleUrls: ['./user-book-card.component.scss'],
})
export class UserBookCardComponent implements OnInit {
  constructor(private dialog: MatDialog) {}
  @Input() book!: Book;
  @Input() userBook!: UserBookModel;
  @Input() tryOpen?: string;
  ngOnInit() {
    console.log(this.tryOpen, this.book);
    if (this.tryOpen == this.userBook._id) {
      this.open();
    }
  }

  open() {
    this.dialog.open(BookViewComponent, { data: this.book });
  }
}
