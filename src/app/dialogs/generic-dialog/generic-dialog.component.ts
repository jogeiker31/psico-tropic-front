import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialsModule } from '../../materials/materials.module';

@Component({
  selector: 'app-generic-dialog',
  standalone: true,
  imports: [MaterialsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './generic-dialog.component.html',
  styleUrl: './generic-dialog.component.scss',
})
export class GenericDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; content: string }
  ) {}
}
