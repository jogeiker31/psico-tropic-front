import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../users/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { VerPostulacionComponent } from './ver-postulacion/ver-postulacion.component';

@Component({
  selector: 'app-postulations',

  templateUrl: './postulations.component.html',
  styleUrl: './postulations.component.scss',
})
export class PostulationsComponent {
  constructor(private dialog: MatDialog, private userServices: UsersService) {}

  displayedColumns: string[] = [
    'name',
    'email',
    'category',
    'status',
    'date',
    'options',
  ];
  dataSource = new MatTableDataSource<any>([]);
  ngOnInit() {}

  setData(data: any[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const filterText = filter.trim().toLowerCase();

      // Formatear la fecha al mismo formato que se muestra en la tabla
      const formattedDate = new Date(data.createdAt).toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });

      return (
        data.user.name.toLowerCase().includes(filterText) ||
        data.user.email.toLowerCase().includes(filterText) ||
        formattedDate.includes(filterText) ||
        data.role.toLowerCase().includes(filterText)
      );
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  open(value: any) {
    this.dialog
      .open(VerPostulacionComponent, { width: '600px', data: value })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            const data = this.dataSource.data.map((item) => {
              if (item._id == value._id) {
                let data = {
                  ...item,
                  status: result,
                };

                return data;
              } else {
                return item;
              }
            });

            this.setData(data);
          }
        },
      });
  }
}
