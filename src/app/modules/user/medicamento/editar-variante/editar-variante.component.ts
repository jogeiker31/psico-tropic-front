import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MedicamentoService,
  MedicamentoVariantes,
  Variante,
} from '../medicamento.service';
import { DialogRef } from '@angular/cdk/dialog';
import { FilesService } from '../../../../shared/files.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../../../../dialogs/generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-editar-variante',
  templateUrl: './editar-variante.component.html',
  styleUrls: ['./editar-variante.component.scss'],
})
export class EditarVarianteComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private medicamentoService: MedicamentoService,
    private dialogRef: DialogRef,
    private filesService: FilesService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Variante
  ) {
    this.form = fb.group({
      foto: [data.foto, [Validators.required]],
      marca: [data.marca, [Validators.required]],
      presentacion: [data.presentacion, [Validators.required]],
      numero_tabletas: [data.numero_tabletas, [Validators.required]],
      importado: [data.importado],
      descripcion: [data.descripcion, []],
      documento_requerido: [data.documento_requerido, []],
    });
  }

  edit() {
    if (this.form.valid) {
      this.medicamentoService
        .editarVariante(this.data._id, this.form.value)
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
