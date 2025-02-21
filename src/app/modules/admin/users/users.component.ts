import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from './users.service';
import { MatTableDataSource } from '@angular/material/table';
import { CreateDoctorComponent } from './create-doctor/create-doctor.component';
import { GenericDeleteDialogComponent } from '../../../dialogs/generic-delete-dialog/generic-delete-dialog.component';
import { GenericDialogComponent } from '../../../dialogs/generic-dialog/generic-dialog.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';

@Component({
  selector: 'app-users',

  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  constructor(private dialog: MatDialog, private userServices: UsersService) {}

  displayedColumns: string[] = [
    'ci',
    'name',
    'username',
    'codigo_colaborador',
    'codigo_farmaceutico',
    'role',
    'date',
    'options',
  ];
  dataSource = new MatTableDataSource<any>([]);
  ngOnInit() {
    this.search();
  }

  search() {
    this.userServices.getUsers();
    this.dataSource = new MatTableDataSource(this.userServices.users);
    this.userServices.$users.subscribe({
      next: (value) => {
        this.dataSource = new MatTableDataSource(value);
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const filterText = filter.trim().toLowerCase();

          // Formatear la fecha al mismo formato que se muestra en la tabla
          const formattedDate = new Date(data.createdAt).toLocaleString(
            'es-ES',
            {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            }
          );

          return (
            data.cedula.toLowerCase().includes(filterText) ||
            data.nombre_usuario.toLowerCase().includes(filterText) ||
            data.nombre_apellido.toLowerCase().includes(filterText) ||
            data.codigo_colaborador.toLowerCase().includes(filterText) ||
            data.codigo_farmaceutico.toLowerCase().includes(filterText) ||
            formattedDate.includes(filterText) ||
            data.role.toLowerCase().includes(filterText)
          );
        };
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  create() {
    this.dialog
      .open(CreateDoctorComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.search();
          }
        },
      });
  }

  edit(user: any) {
    this.dialog
      .open(EditDoctorComponent, { data: user })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.search();
          }
        },
      });
  }

  delete(user: any) {
    this.dialog
      .open(GenericDeleteDialogComponent, {
        data: {
          title: 'Eliminar doctor',
          content: '¿Seguro que quieres eliminar este doctor?',
        },
      })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (value) {
            this.makeDelete(user);
          }
        },
      });
  }

  makeDelete(user: any) {
    this.userServices.deleteDoctor(user._id).subscribe({
      next: (v) => {
        this.search();
        this.dialog.open(GenericDialogComponent, {
          data: {
            title: 'Doctor eliminado',
            content: 'El doctor se ha eliminado correctamente ',
          },
        });
      },
    });
  }
}
