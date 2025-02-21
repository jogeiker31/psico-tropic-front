import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../admin/users/users.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../../admin/categories/categories.service';

@Component({
  selector: 'app-create-postulation',
  templateUrl: './create-postulation.component.html',
  styleUrls: ['./create-postulation.component.scss'],
})
export class CreatePostulationComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private categoryService: CategoriesService,
    private dialog: MatDialogRef<CreatePostulationComponent>
  ) {
    this.form = this.formBuilder.group({
      category: ['', [Validators.required]], // Campo de nombre
      message: ['', [Validators.required]], // Campo de nombre
    });
  }

  ngOnInit() {}

  get categories() {
    return this.categoryService.categories;
  }

  add() {
   
  }
}
