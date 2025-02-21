import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../categories/categories.service';
import { FilesService } from '../../../../shared/files.service';
import { BooksService } from '../books.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss'],
})
export class CreateBookComponent implements OnInit {
  form: FormGroup;

  constructor(
    private dialogRef: DialogRef<CreateBookComponent>,
    private fb: FormBuilder,
    private categorieService: CategoriesService,
    private filesService: FilesService,
    private bookService: BooksService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      author: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categorie: ['', [Validators.required]],
      cover: ['', [Validators.required]],
      price: [0, [Validators.required]],
      file: ['', [Validators.required]],
    });
  }

  create() {
    console.log(this.form.value);

    this.bookService.createBook(this.form.value).subscribe({
      next: (value) => {
        this.bookService.books.push(value);
        this.bookService.$books.next(this.bookService.books);
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
