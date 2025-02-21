import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { MaterialsModule } from '../../materials/materials.module';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../../dialogs/generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MaterialsModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  text = 'hola';
  texts = [
    'Bienvenido',
    'Encuentra tu Balance Interior',
    'Comienza hoy a invertir en ti mismo',
    'Desarrollando Bienestar',
  ];
  currentIndex = 0;
  showText = true;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private ngZone: NgZone,
    private cd: ChangeDetectorRef
  ) {
    // Inicializa el formulario
    this.loginForm = this.formBuilder.group({
      usuario: ['', [Validators.required]], // Campo de email
      password: ['', [Validators.required]], // Campo de contraseña
    });

    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.showText = false; // Fade Out
        this.cd.detectChanges();
        setTimeout(() => {
          this.currentIndex = (this.currentIndex + 1) % this.texts.length;
          this.showText = true; // Fade In
        }, 100); // Espera 500ms antes de cambiar el texto
      }, 3000); // Cambia cada 3 segundos
    });
  }

  login() {
    if (this.loginForm.valid) {
      const usuario = this.loginForm.get('usuario')?.value; // Obtiene el valor del campo usuario
      const password = this.loginForm.get('password')?.value; // Obtiene el valor del campo password

      this.apiService.login(usuario, password).subscribe({
        next: (value) => {
          this.dialog
            .open(GenericDialogComponent, {
              width: '300px', // Puedes ajustar el tamaño aquí
              data: {
                title: 'Bienvenido',
                content: 'Bienvenido al sistema',
              },
            })
            .afterClosed()
            .subscribe({
              next: (v) => {
                localStorage.setItem('token', value.access_token);

                this.router.navigate(['/app']);
              },
            });
        },
        error: (e) => {
          this.dialog.open(GenericDialogComponent, {
            width: '300px', // Puedes ajustar el tamaño aquí
            data: {
              title: 'Credenciales invalidas',
              content: 'Usuario o contraseña invalida',
            },
          });
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
