import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../categories.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.scss'],
})
export class EditCategorieComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private categorieService: CategoriesService,
    private dialog: MatDialogRef<EditCategorieComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { _id: string; name: string }
  ) {
    this.form = this.formBuilder.group({
      name: [data.name, [Validators.required]], // Campo de nombre
    });
  }

  ngOnInit() {}

  edit() {
    this.categorieService
      .update(this.data._id, { name: this.form.value.name })
      .subscribe({
        next: (value) => {
          this.categorieService.updateCategory(value);
          this.dialog.close();
        },
        error: (e) => {},
      });
  }
}
