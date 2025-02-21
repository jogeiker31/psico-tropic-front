import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankAccountsService } from '../../../../shared/bank-accounts.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BankAccountModel } from '../../../../shared/models/bank-account.model';

@Component({
  selector: 'app-edit-bank',
  templateUrl: './edit-bank.component.html',
  styleUrls: ['./edit-bank.component.scss'],
})
export class EditBankComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private bankAccountService: BankAccountsService,
    private dialogRef: MatDialogRef<EditBankComponent>,
    @Inject(MAT_DIALOG_DATA) private data: BankAccountModel
  ) {
    this.form = this.fb.group({
      bank: [data.bank, [Validators.required]],
      type: [
       'PAGO',
        [Validators.required],
      ],
      mobile: [data.mobile, [Validators.required]],
      bankAccount: [data.bankAccount, []],
      bankCode: [data.bankCode, [Validators.required]],
      identification: [data.identification, [Validators.required]],
      name: [data.name, []],
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

    if(  data.type == 'TRANSFERENCIA' ){
      this.form.get("type")?.setValue("TRANSFERENCIA")
    }
  }

  ngOnInit() {}

  create() {
    let value = this.form.value;
    if (value.type == 'PAGO') {
      value.type = 'PAGO MOVIL';
    }
    this.bankAccountService.update(this.data._id, value).subscribe({
      next: () => {
        this.bankAccountService.getbanks();
        this.dialogRef.close(true);
      },
    });
  }
}
