import { Component, Inject, OnInit } from '@angular/core';
import { ImageModalComponent } from '../../../../shared/image-modal/image-modal.component';
import { environment } from '../../../../../environments/environment';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PendingPurchasesMembership } from '../../../../shared/models/pending-purchases-membership.model';
import { MermbershipService } from '../../../../shared/mermbership.service';

@Component({
  selector: 'app-transaction-membership-detail',
  templateUrl: './transaction-membership-detail.component.html',
  styleUrls: ['./transaction-membership-detail.component.scss']
})
export class TransactionMembershipDetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: PendingPurchasesMembership,
    private dialog: MatDialog,
    private membershipService: MermbershipService,
    private dialogRef: MatDialogRef<TransactionMembershipDetailComponent>
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
    this.membershipService.verifyPendingPurchase(this.data._id, true, '').subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
    });
  }

  reason = '';
  isReject = false;
  reject() {
    this.membershipService
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
