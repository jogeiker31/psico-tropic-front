import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './database.service';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../../../dialogs/generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss'],
})
export class DatabaseComponent implements OnInit {
  constructor(
    private databaseService: DatabaseService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  backup() {
    this.databaseService.backup();
  }

  restore() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.gz';
    input.click();
    input.onchange = (ev) => {
      const target = ev.target as HTMLInputElement;
      const file = target?.files?.[0];
      const form = new FormData();
      if (file) {
        form.append('file', file);

        this.databaseService.restore(form).subscribe({
          next: (value: any) => {
            this.dialog.open(GenericDialogComponent, {
              data: {
                title: 'Resturación exitosa',
                content: 'Se ha restaurado la base de datos',
              },
            });
          },
          error: (err) => {
            this.dialog.open(GenericDialogComponent, {
              data: {
                title: 'Error',
                content:
                  'Ha habido un error intentando restaurar la base de datos',
              },
            });
          },
        });
      }
    };
  }
}
