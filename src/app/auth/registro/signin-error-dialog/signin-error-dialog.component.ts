import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { MaterialsModule } from '../../../materials/materials.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-signin-error-dialog',
  standalone: true,
  imports: [MaterialsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './signin-error-dialog.component.html',
  styleUrl: './signin-error-dialog.component.scss',
})
export class SigninErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { error: string }) {}

  public get errorMsg(): string {
    switch (this.data.error) {
      case 'email_used':
        return 'El correo se encuentra en uso, intente con otro';
      default:
        return 'Intente mas tarde';
    }
  }
}
