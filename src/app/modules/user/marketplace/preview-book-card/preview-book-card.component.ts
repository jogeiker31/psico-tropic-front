import { Component, Input, OnInit } from '@angular/core';
import { BookModel } from '../../../admin/books/book.model';
import { MatDialog } from '@angular/material/dialog';
import { UserBooksService } from '../../services/user-books.service';
import { PreviewBookComponent } from '../preview-book/preview-book.component';


@Component({
  selector: 'preview-book-card',
  templateUrl: './preview-book-card.component.html',
  styleUrls: ['./preview-book-card.component.scss'],
})
export class PreviewBookCardComponent implements OnInit {
  @Input() public book!: BookModel;
  constructor(
    private dialog: MatDialog,
    private bookService: UserBooksService
  ) {}

  ngOnInit() {}

  open() {
    this.dialog.open(PreviewBookComponent, { data: this.book  });
  }
}
