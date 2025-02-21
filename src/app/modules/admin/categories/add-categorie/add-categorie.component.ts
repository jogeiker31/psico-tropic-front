import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../categories.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss'],
})
export class AddCategorieComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private categorieService: CategoriesService,
    private dialog: MatDialogRef<AddCategorieComponent>
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]], // Campo de nombre
    });
  }

  ngOnInit() {}

  add() {
    this.categorieService
      .createCategory({ name: this.form.value.name })
      .subscribe({
        next: (value) => {
          this.categorieService.addCategory(value);
          this.dialog.close();
        },
        error: (e) => {},
      });
  }
}
