import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserBookModel } from '../../../../shared/models/user-book.model';
import { UserBooksService } from '../../services/user-books.service';
import { BankAccountsService } from '../../../../shared/bank-accounts.service';
import { FilesService } from '../../../../shared/files.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PendingPurchasesBook } from '../../../admin/books/pending-purchases-books.model';
import { GenericDialogComponent } from '../../../../dialogs/generic-dialog/generic-dialog.component';
import { MermbershipService } from '../../../../shared/mermbership.service';
import { MembershipModel } from '../../../../shared/models/membership.model';
import { PendingPurchasesMembership } from '../../../../shared/models/pending-purchases-membership.model';

@Component({
  selector: 'app-buy-membership',
  templateUrl: './buy-membership.component.html',
  styleUrls: ['./buy-membership.component.scss'],
})
export class BuyMembershipComponent implements OnInit {
  public form: FormGroup;

  public userBook?: UserBookModel;

  constructor(
    private BanksService: BankAccountsService,
    private filesService: FilesService,

    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private membershipService: MermbershipService
  ) {
    this.form = fb.group({
      bank: [null, [Validators.required]],
      receiptImage: ['', Validators.required],
      transactionDate: ['', [Validators.required]],
      referenceNumber: ['', [Validators.required]],
      membership: ['', [Validators.required]],
    });
  }

  get banks() {
    return this.BanksService.banks;
  }

  get bankSelected() {
    if (this.form?.value.bank != null) {
      return this.BanksService.banks.find(
        (e) => e._id == this.form?.value.bank
      );
    } else {
      return null;
    }
  }

  ngOnInit() {
    this.BanksService.getbanks();

    this.loading = false;

    this.membershipService.create().subscribe({
      next: (value: MembershipModel) => {
        console.log(value);
        this.form.controls['membership'].setValue(value._id);
        this.getPurchasedData(value._id);
      },
    });
  }

  purchaseData?: PendingPurchasesMembership;
  loading = false;
  getPurchasedData(id: string) {
    this.loading = true;
    this.membershipService.getMembershipPurchaseData(id).subscribe({
      next: (v) => {
        if (v) {
          this.created = true;
          this.purchaseData = v;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  clearFile() {
    this.form.controls['receiptImage'].setValue('');
    this.file = undefined;
  }

  file?: File;

  loadCover() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    input.onchange = (ev) => {
      const target = ev.target as HTMLInputElement;
      const file = target?.files?.[0];
      this.file = file;
      if (file) {
        this.filesService.uploadFile(file).subscribe({
          next: (value: any) => {
            this.form?.controls['receiptImage'].setValue(value._id);
          },
          error(err) {},
        });
      }
    };
  }

  get book() {
    return this.userBook?.book;
  }

  created = false;
  create() {
    if (this.purchaseData) {
      this.membershipService
        .patchMembershipPurchaseData(this.purchaseData._id, this.form.value)
        .subscribe({
          next: (v) => {
            this.created = true;
            this.purchaseData = v;
          },
          error: () => {
            this.dialog.open(GenericDialogComponent, {
              data: {
                title: 'Ha ocurrido un error',
                content: 'Ocurrio un error en tu petición, intente mas tarde',
              },
            });
          },
        });
    } else {
      this.membershipService
        .createPurchaseMemebership(this.form.value)
        .subscribe({
          next: () => {
            this.created = true;
          },
          error: () => {
            this.dialog.open(GenericDialogComponent, {
              data: {
                title: 'Ha ocurrido un error',
                content: 'Ocurrio un error en tu petición, intente mas tarde',
              },
            });
          },
        });
    }
  }
}
