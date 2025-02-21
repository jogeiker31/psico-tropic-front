import { Component, OnInit } from '@angular/core';
import { MermbershipService } from '../../../shared/mermbership.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PendingPurchasesMembership } from '../../../shared/models/pending-purchases-membership.model';
import { TransactionBookDetailsComponent } from '../transactions/books-transactions/transaction-book-details/transaction-book-details.component';
import { TransactionMembershipDetailComponent } from './transaction-membership-detail/transaction-membership-detail.component';

@Component({
  selector: 'app-memberships-transactions',
  templateUrl: './memberships-transactions.component.html',
  styleUrls: ['./memberships-transactions.component.scss'],
})
export class MembershipsTransactionsComponent implements OnInit {
  constructor(
    private membershipService: MermbershipService,
    private dialog: MatDialog
  ) {}
  displayedColumns: string[] = ['user', 'bank', 'status', 'date', 'options'];
  ngOnInit() {
    this.findMembership();
  }
  dataSource = new MatTableDataSource<PendingPurchasesMembership>([]);
  findMembership() {
    this.membershipService.getPendingPurchases().subscribe({
      next: (value) => {
        this.dataSource = new MatTableDataSource(value);
    
      },
    });
  }

  open(membership: PendingPurchasesMembership) {
    this.dialog
      .open(TransactionMembershipDetailComponent, { data: membership })
      .afterClosed()
      .subscribe({
        next: (va) => {
          if (va) {
            this.findMembership();
          }
        },
      });
  }
}
