import { Component, OnInit } from '@angular/core';
import { UserBooksService } from '../../../user/services/user-books.service';
import { BooksService } from '../../books/books.service';
import { MatTableDataSource } from '@angular/material/table';
import { PendingPurchasesBook } from '../../books/pending-purchases-books.model';
import { TransactionBookDetailsComponent } from './transaction-book-details/transaction-book-details.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-books-transactions',
  templateUrl: './books-transactions.component.html',
  styleUrls: ['./books-transactions.component.scss'],
})
export class BooksTransactionsComponent implements OnInit {
  constructor(
    private booksService: BooksService,
    private dialog: MatDialog,
   
  ) {}
  displayedColumns: string[] = [
    'book',
    'user',
    'bank',
    'status',
    'date',
    'options',
  ];
  ngOnInit() {
    this.findBooks();
  }
  dataSource = new MatTableDataSource<PendingPurchasesBook>([]);
  findBooks() {
   
    this.booksService.getPendingPurchases().subscribe({
      next: (value) => {
        
        this.dataSource = new MatTableDataSource(value);
      },
    });
  }

  open(book: PendingPurchasesBook) {
    this.dialog
      .open(TransactionBookDetailsComponent, { data: book })
      .afterClosed()
      .subscribe({
        next: (va) => {
          if (va) {
            this.findBooks();
          }
        },
      });
  }
}
