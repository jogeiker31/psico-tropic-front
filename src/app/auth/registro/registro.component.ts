import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialsModule } from '../../materials/materials.module';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SigninErrorDialogComponent } from './signin-error-dialog/signin-error-dialog.component';
import { GenericDialogComponent } from '../../dialogs/generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    MaterialsModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,

    CommonModule,
  ],

  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {
    // Inicializa el formulario
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]], // Campo de nombre
      email: ['', [Validators.required, Validators.email]], // Campo de email
      password: ['', [Validators.required]], // Campo de contraseña
      rpassword: ['', [Validators.required]], // Campo de repetir contraseña
    });

    // Establece un validador personalizado después de la creación del formulario
    this.form
      .get('rpassword')
      ?.addValidators(this.passwordMatchValidator.bind(this));
  }

  // Validador personalizado para verificar que las contraseñas coincidan
  passwordMatchValidator(control: any) {
    const password = this.form.get('password')?.value;
    const rpassword = control.value;

    if (password !== rpassword) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }

  signin() {
    if (this.form.valid) {
      const value = this.form.value; // Obtiene el valor del campo email
      console.log(value);

      this.apiService
        .signin(value)

        .subscribe({
          next: (response) => {
            this.dialog
              .open(GenericDialogComponent, {
                width: '300px', // Puedes ajustar el tamaño aquí
                data: {
                  title: 'Cuenta creada',
                  content: 'Ya puedes iniciar sesión',
                },
              })
              .afterClosed()
              .subscribe({
                next: (v) => {
                  this.router.navigate(['/']);
                },
              });
          },
          error: (err) => {
            this.dialog.open(SigninErrorDialogComponent, {
              width: '300px', // Puedes ajustar el tamaño aquí
              data: { error: err.error.error_code }, // Puedes pasar datos al diálogo si es necesario
            });
          },
        });
    } else {
      console.error('Form is invalid');
    }
  }
}
