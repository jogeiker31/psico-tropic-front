import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookModel } from '../../admin/books/book.model';

@Component({
  selector: 'app-preview-book',
  templateUrl: './preview-book.component.html',
  styleUrls: ['./preview-book.component.scss'],
})
export class PreviewBookComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: BookModel) {}

  ngOnInit() {}
}
