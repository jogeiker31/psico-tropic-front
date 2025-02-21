import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateBookComponent } from '../create-book/create-book.component';
import { CategoriesService } from '../../categories/categories.service';
import { FilesService } from '../../../../shared/files.service';
import { BooksService } from '../books.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookModel } from '../book.model';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent implements OnInit {
  form: FormGroup;

  constructor(
    private dialogRef: DialogRef<CreateBookComponent>,
    @Inject(MAT_DIALOG_DATA) private data: BookModel,
    private fb: FormBuilder,
    private categorieService: CategoriesService,
    private filesService: FilesService,
    private bookService: BooksService
  ) {
    this.form = this.fb.group({
      name: [data.name, [Validators.required]],
      author: [data.author, [Validators.required]],
      description: [data.description, [Validators.required]],
      categorie: [data.categorie._id, [Validators.required]],
      cover: [data.cover, [Validators.required]],
      price: [data.price, [Validators.required]],
      file: [data.file, [Validators.required]],
    });
  }

  create() {
    this.bookService.editBook(this.data._id, this.form.value).subscribe({
      next: (value) => {
        this.bookService.reloadBook(this.data._id, value);
        this.dialogRef.close();
      },
    });
  }

  get categories() {
    return this.categorieService.categories;
  }
  ngOnInit() {}

  loadCover() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    input.onchange = (ev) => {
      const target = ev.target as HTMLInputElement;
      const file = target?.files?.[0];
      if (file) {
        console.log(file);
        this.filesService.uploadFile(file).subscribe({
          next: (value: any) => {
            this.form?.controls['cover'].setValue(value._id);
          },
          error(err) {
            console.log(err);
          },
        });
      }
    };
  }

  file?: File;

  clearFile() {
    this.form.controls['file'].setValue('');
    this.file = undefined;
  }

  downloadFile() {
    this.filesService.download(this.data.file);
  }

  loadPdf() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    input.click();
    input.onchange = (ev) => {
      const target = ev.target as HTMLInputElement;
      const file = target?.files?.[0];
      if (file) {
        this.filesService.uploadFile(file).subscribe({
          next: (value: any) => {
            this.file = file;
            this.form?.controls['file'].setValue(value._id);
          },
          error(err) {
            console.log(err);
          },
        });
      }
    };
  }
}
