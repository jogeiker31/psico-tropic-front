import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenericDialogComponent } from '../../../../dialogs/generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.scss'],
})
export class CreateDoctorComponent implements OnInit {
  form: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<CreateDoctorComponent>,
    private fb: FormBuilder,
    private userService: UsersService,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      nombre_apellido: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      codigo_farmaceutico: ['', [Validators.required]],
      codigo_colaborador: ['', []],
    });
  }

  ngOnInit() {}

  create() {
    if (this.form.valid) {
      this.userService.createDoctor(this.form.value).subscribe({
        next: (resultado) => {
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
