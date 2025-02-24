import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MedicamentoService,
  MedicamentoVariantes,
  PrincipioActivo,
  Variante,
} from '../medicamento.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../../../../dialogs/generic-dialog/generic-dialog.component';
import { FilesService } from '../../../../shared/files.service';

@Component({
  selector: 'app-crear-variante',
  templateUrl: './crear-variante.component.html',
  styleUrls: ['./crear-variante.component.scss'],
})
export class CrearVarianteComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private medicamentoService: MedicamentoService,
    private dialogRef: DialogRef,
    private filesService: FilesService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: PrincipioActivo
  ) {
    this.form = fb.group({
      principio_activo: [data._id, [Validators.required]],
      foto: [null, [Validators.required]],
      marca: ['', [Validators.required]],
      presentacion: ['', [Validators.required]],
      numero_tabletas: ['', [Validators.required]],
      importado: [false],
      descripcion: ['', []],
      documento_requerido: ['', []],
    });
  }

  create() {
    if (this.form.valid) {
      this.medicamentoService.crearVariante(this.form.value).subscribe({
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

  cargarFoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    input.onchange = (ev) => {
      const target = ev.target as HTMLInputElement;
      const file = target?.files?.[0];
      if (file) {
        this.filesService.uploadFile(file).subscribe({
          next: (value: any) => {
            this.form?.controls['foto'].setValue(value._id);
          },
          error(err) {},
        });
      }
    };
  }

  ngOnInit() {}
}
