import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicamentoService } from '../medicamento.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../../../../dialogs/generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-crear-medicamento',
  templateUrl: './crear-medicamento.component.html',
  styleUrls: ['./crear-medicamento.component.scss'],
})
export class CrearMedicamentoComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private medicamentoService: MedicamentoService,
    private dialogRef: DialogRef,
    private dialog: MatDialog
  ) {
    this.form = fb.group({
      principio_activo: ['', [Validators.required]],
      limite: [0, Validators.min(1)],
    });
  }

  create() {
    if (this.form.valid) {
      this.medicamentoService.crear(this.form.value).subscribe({
        next: (v) => {
          this.dialogRef.close(true);
        },
        error: () => {
          this.dialog.open(GenericDialogComponent, {
            data: { title: 'Ocurrio un error', content: 'Intente mas tarde.' },
          });
        },
      });
    }
  }

  ngOnInit() {}
}
