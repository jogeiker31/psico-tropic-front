import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookModel } from '../../../admin/books/book.model';
import { Book } from '../../../../shared/models/user-book.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
})
export class BookViewComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Book,
    private dialogRef: MatDialogRef<BookViewComponent> // private userBookService: UserBooksService, // private router: Router
  ) {}

  ngOnInit() {}

  get book() {
    return this.data;
  }

  viewFile() {
    window.open(environment.api_url + '/files/view/' + this.book.file, '_blank');
  }
}
