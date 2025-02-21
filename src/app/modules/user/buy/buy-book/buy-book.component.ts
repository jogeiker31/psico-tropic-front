import { Component, OnInit } from '@angular/core';
import { UserBooksService } from '../../services/user-books.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { UserBookModel } from '../../../../shared/models/user-book.model';
import { BankAccountsService } from '../../../../shared/bank-accounts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilesService } from '../../../../shared/files.service';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../../../../dialogs/generic-dialog/generic-dialog.component';
import { PendingPurchasesBook } from '../../../admin/books/pending-purchases-books.model';

@Component({
  selector: 'app-buy-book',
  templateUrl: './buy-book.component.html',
  styleUrls: ['./buy-book.component.scss'],
})
export class BuyBookComponent implements OnInit {
  public form: FormGroup;
  private bookId?: string;
  public userBook?: UserBookModel;

  constructor(
    private userBookService: UserBooksService,
    private BanksService: BankAccountsService,
    private filesService: FilesService,
    private readonly route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.form = fb.group({
      bank: [null, [Validators.required]],
      receiptImage: ['', Validators.required],
      transactionDate: ['', [Validators.required]],
      referenceNumber: ['', [Validators.required]],
      userBook: [this.userBook?._id, [Validators.required]],
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
    this.bookId = this.route.snapshot.paramMap.get('id') || '';

    if (this.bookId) {
      this.form.controls['userBook'].setValue(this.bookId);

      this.userBookService.getUserBookById(this.bookId).subscribe({
        next: (data) => {
          if (data.status == 'BOUGHT') {
            this.router.navigate(['/app/books']);
          } else {
            this.getPurchasedData();
          }
          this.userBook = data;
        },
      });
    }
  }

  purchaseData?: PendingPurchasesBook;
  loading = false;
  getPurchasedData() {
    this.loading = true;
    this.userBookService.getUserBookPurchaseData(this.bookId!).subscribe({
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
      this.userBookService
        .patchUserBookPurchaseData(this.purchaseData._id, this.form.value)
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
      this.userBookService.createUserBook(this.form.value).subscribe({
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
