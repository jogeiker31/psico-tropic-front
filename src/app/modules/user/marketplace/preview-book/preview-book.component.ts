import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookModel } from '../../../admin/books/book.model';
import { UserBooksService } from '../../services/user-books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview-book',
  templateUrl: './preview-book.component.html',
  styleUrls: ['./preview-book.component.scss'],
})
export class PreviewBookComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: BookModel,
    private dialogRef: MatDialogRef<PreviewBookComponent>,
    private userBookService: UserBooksService,
    private router: Router
  ) {}

  ngOnInit() {}

  get book() {
    return this.data;
  }

  buy() {
    this.userBookService.buy(this.book._id).subscribe({
      next: (data: any) => {
        this.router.navigate([`/app/buy/book/${data._id}`]);
        this.dialogRef.close();
      },
    });
  }
}
