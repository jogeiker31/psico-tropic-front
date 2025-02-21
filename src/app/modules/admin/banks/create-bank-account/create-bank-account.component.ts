import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankAccountsService } from '../../../../shared/bank-accounts.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-bank-account',
  templateUrl: './create-bank-account.component.html',
  styleUrls: ['./create-bank-account.component.scss'],
})
export class CreateBankAccountComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private bankAccountService: BankAccountsService,
    private dialogRef: MatDialogRef<CreateBankAccountComponent>
  ) {
    this.form = this.fb.group({
      bank: ['', [Validators.required]],
      type: ['PAGO', [Validators.required]],
      mobile: ['', [Validators.required]],
      bankAccount: ['', []],
      bankCode: ['', [Validators.required]],
      identification: ['', [Validators.required]],
      name: ['', []],
    });

    this.form.get('type')?.valueChanges.subscribe((type) => {
      if (type === 'PAGO') {
        this.form.get('mobile')?.setValidators([Validators.required]);
        this.form.get('bankCode')?.setValidators([Validators.required]);
        this.form.get('identification')?.setValidators([Validators.required]);

        this.form.get('name')?.clearValidators();
        this.form.get('bankAccount')?.clearValidators();
      } else if (type === 'TRANSFERENCIA') {
        this.form.get('name')?.setValidators([Validators.required]);
        this.form.get('bankAccount')?.setValidators([Validators.required]);

        this.form.get('mobile')?.clearValidators();
        this.form.get('bankCode')?.clearValidators();
        this.form.get('identification')?.clearValidators();
      }

      // Es importante actualizar la validación para que Angular refleje los cambios
      this.form.get('mobile')?.updateValueAndValidity();
      this.form.get('bankCode')?.updateValueAndValidity();
      this.form.get('identification')?.updateValueAndValidity();
      this.form.get('name')?.updateValueAndValidity();
      this.form.get('bankAccount')?.updateValueAndValidity();
    });
  }

  ngOnInit() {}

  create() {
    let value = this.form.value;
    if (value.type == 'PAGO') {
      value.type = 'PAGO MOVIL';
    }
    this.bankAccountService.create(value).subscribe({
      next: () => {
        this.bankAccountService.getbanks();
        this.dialogRef.close();
      },
    });
  }
}
