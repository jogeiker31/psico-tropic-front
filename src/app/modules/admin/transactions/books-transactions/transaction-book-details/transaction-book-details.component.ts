import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { PendingPurchasesBook } from '../../../books/pending-purchases-books.model';
import { IAlbum, Lightbox } from 'ngx-lightbox';
import { environment } from '../../../../../../environments/environment';
import { ImageModalComponent } from '../../../../../shared/image-modal/image-modal.component';
import { BooksService } from '../../../books/books.service';

@Component({
  selector: 'app-transaction-book-details',
  templateUrl: './transaction-book-details.component.html',
  styleUrls: ['./transaction-book-details.component.scss'],
})
export class TransactionBookDetailsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: PendingPurchasesBook,
    private dialog: MatDialog,
    private bookService: BooksService,
    private dialogRef: MatDialogRef<TransactionBookDetailsComponent>
  ) {}

  get transaction() {
    return this.data;
  }

  ngOnInit() {}
  url = environment.api_url;

  openImage(): void {
    this.dialog.open(ImageModalComponent, {
      data: {
        imageUrl: `${environment.api_url}/files/${this.transaction.receiptImage}`,
      },
      panelClass: 'custom-dialog',
    });
  }

  accept() {
    this.bookService.verifyPendingPurchase(this.data._id, true, '').subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
    });
  }

  reason = '';
  isReject = false;
  reject() {
    this.bookService
      .verifyPendingPurchase(this.data._id, false, this.reason)
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
      });
  }

  cancel() {
    this.isReject = false;
    this.reason = '';
  }
}
