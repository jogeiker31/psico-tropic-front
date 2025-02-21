import { Component, Input, OnInit } from '@angular/core';
import { BankAccountModel } from '../../../../shared/models/bank-account.model';
import { MatDialog } from '@angular/material/dialog';
import { GenericDeleteDialogComponent } from '../../../../dialogs/generic-delete-dialog/generic-delete-dialog.component';
import { BankAccountsService } from '../../../../shared/bank-accounts.service';
import { GenericDialogComponent } from '../../../../dialogs/generic-dialog/generic-dialog.component';
import { EditBankComponent } from '../edit-bank/edit-bank.component';

@Component({
  selector: 'bank-card',
  templateUrl: './bank-card.component.html',
  styleUrls: ['./bank-card.component.scss'],
})
export class BankCardComponent implements OnInit {
  @Input() bank!: BankAccountModel;
  constructor(
    private dialog: MatDialog,
    private bankAccountService: BankAccountsService
  ) {}

  ngOnInit() {}

  edit() {
    this.dialog
      .open(EditBankComponent, { data: this.bank })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.dialog.open(GenericDialogComponent, {
              data: {
                title: 'Cambios guardados',
                content: 'Los cambios se realizaron con éxito',
              },
            });
          }
        },
      });
  }
  delete() {
    this.dialog
      .open(GenericDeleteDialogComponent, {
        data: {
          title: 'Eliminar cuenta',
          content: '¿Seguro que deseas eliminar esta cuenta de banco?',
        },
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.bankAccountService.delete(this.bank._id).subscribe({
              next: () => {
                this.bankAccountService.getbanks();
                this.dialog.open(GenericDialogComponent, {
                  data: {
                    title: 'Cuenta eliminada',
                    content: 'La cuenta de banco se ha eliminado del sistema',
                  },
                });
              },
            });
          }
        },
      });
  }
}
