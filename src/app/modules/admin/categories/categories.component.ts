import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { CategoriesService } from './categories.service';
import { MatTableDataSource } from '@angular/material/table';
import { EditCategorieComponent } from './edit-categorie/edit-categorie.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private categorieService: CategoriesService
  ) {}

  displayedColumns: string[] = ['name', 'enabled', 'options'];
  dataSource = new MatTableDataSource<any>([]);
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.categorieService.categories);
    this.categorieService.$categories.subscribe({
      next: (value) => {
        this.dataSource = new MatTableDataSource(value);
      },
    });
  }

  add() {
    this.dialog.open(AddCategorieComponent, { width: '500px' });
  }

  edit(value: any) {
    this.dialog.open(EditCategorieComponent, { width: '500px', data: value });
  }
}
