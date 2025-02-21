import { Component, Input, input, OnInit } from '@angular/core';
import { BookModel } from '../book.model';
import { EditBookComponent } from '../edit-book/edit-book.component';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../../../../dialogs/generic-dialog/generic-dialog.component';
import { GenericDeleteDialogComponent } from '../../../../dialogs/generic-delete-dialog/generic-delete-dialog.component';
import { BooksService } from '../books.service';

@Component({
  selector: 'book-card-admin',
  templateUrl: './book-card-admin.component.html',
  styleUrls: ['./book-card-admin.component.scss'],
})
export class BookCardAdminComponent implements OnInit {
  @Input() public book!: BookModel;
  constructor(private dialog: MatDialog, private bookService: BooksService) {}

  ngOnInit() {}

  edit() {
    this.dialog.open(EditBookComponent, { data: this.book });
  }

  delete() {
    this.dialog
      .open(GenericDeleteDialogComponent, {
        data: {
          title: 'Eliminar Libro',
          content: '¿Seguro que deseas eliminar este libro?',
        },
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.bookService.deleteBook(this.book._id).subscribe({
              next: (v) => {
                this.bookService.removeBook(this.book._id);
              },
            });
          }
        },
      });
  }
}
