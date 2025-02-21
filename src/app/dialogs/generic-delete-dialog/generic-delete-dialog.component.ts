import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialsModule } from '../../materials/materials.module';

@Component({
  selector: 'app-generic-delete-dialog',
  standalone: true,
  imports: [MaterialsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './generic-delete-dialog.component.html',
  styleUrls: ['./generic-delete-dialog.component.scss'],
})
export class GenericDeleteDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; content: string },
    private dialogRef: MatDialogRef<GenericDeleteDialogComponent>
  ) {}

  ngOnInit() {}

  accept() {
    this.dialogRef.close(true);
  }
}
