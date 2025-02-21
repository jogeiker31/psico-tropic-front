import { Component, OnInit } from '@angular/core';
import { BankAccountsService } from '../../../shared/bank-accounts.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateBankAccountComponent } from './create-bank-account/create-bank-account.component';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss'],
})
export class BanksComponent implements OnInit {
  constructor(
    private banksAccountService: BankAccountsService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.banksAccountService.getbanks();
  }

  get banks() {
    return this.banksAccountService.banks;
  }
  create() {
    this.dialog.open(CreateBankAccountComponent);
  }
}
