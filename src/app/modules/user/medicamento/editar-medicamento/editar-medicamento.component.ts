import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicamentoService, PrincipioActivo } from '../medicamento.service';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { GenericDialogComponent } from '../../../../dialogs/generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-editar-medicamento',
  templateUrl: './editar-medicamento.component.html',
  styleUrls: ['./editar-medicamento.component.scss'],
})
export class EditarMedicamentoComponent implements OnInit {
  ngOnInit(): void {}
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private medicamentoService: MedicamentoService,
    private dialogRef: MatDialogRef<EditarMedicamentoComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: PrincipioActivo
  ) {
    this.form = fb.group({
      principio_activo: [data.principio_activo, [Validators.required]],
      limite: [data.limite, Validators.min(1)],
    });
  }

  edit() {
    if (this.form.valid) {
      this.medicamentoService
        .editarMedicamento(this.data._id, this.form.value)
        .subscribe({
          next: (v) => {
            this.dialogRef.close(true);
          },
          error: () => {
            this.dialog.open(GenericDialogComponent, {
              data: {
                title: 'Ocurrio un error',
                content: 'Intente mas tarde.',
              },
            });
          },
        });
    }
  }
}
