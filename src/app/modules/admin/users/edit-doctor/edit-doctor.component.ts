import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CreateDoctorComponent } from '../create-doctor/create-doctor.component';
import { UsersService } from '../users.service';
import { GenericDialogComponent } from '../../../../dialogs/generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss'],
})
export class EditDoctorComponent implements OnInit {
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CreateDoctorComponent>,
    private fb: FormBuilder,
    private userService: UsersService,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      nombre_apellido: [data.nombre_apellido, [Validators.required]],
      cedula: [data.cedula, [Validators.required]],
      codigo_farmaceutico: [data.codigo_farmaceutico, [Validators.required]],
      codigo_colaborador: [data.codigo_colaborador, []],
    });
  }

  ngOnInit() {}

  save() {
    if (this.form.valid) {
      this.userService.editDoctor(this.data._id, this.form.value).subscribe({
        next: (v) => {
          this.dialogRef.close(true);
        },
        error: (e) => {
          const { error } = e;

          this.dialog.open(GenericDialogComponent, {
            data: {
              title: 'Ocurrio un error',
              content:
                error['type'] == 'custom'
                  ? error['message']
                  : 'Ha ocurrido un error, intente mas tarde',
            },
          });
        },
      });
    }
  }
}
