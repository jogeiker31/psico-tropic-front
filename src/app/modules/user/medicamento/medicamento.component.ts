import { Component, OnInit } from '@angular/core';
import {
  MedicamentoService,
  MedicamentoVariantes,
  Variante,
} from './medicamento.service';
import { CrearMedicamentoComponent } from './crear-medicamento/crear-medicamento.component';
import { MatDialog } from '@angular/material/dialog';
import { CrearVarianteComponent } from './crear-variante/crear-variante.component';
import { EditarVarianteComponent } from './editar-variante/editar-variante.component';
import { GenericDeleteDialogComponent } from '../../../dialogs/generic-delete-dialog/generic-delete-dialog.component';

@Component({
  selector: 'app-medicamento',
  templateUrl: './medicamento.component.html',
  styleUrls: ['./medicamento.component.scss'],
})
export class MedicamentoComponent implements OnInit {
  constructor(
    private medicamentoService: MedicamentoService,

    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.buscar();
  }

  medicamentos: MedicamentoVariantes[] = [];

  buscar() {
    this.medicamentoService.obtenerMedicamentos().subscribe({
      next: (data) => {
        this.medicamentos = data;
      },
    });
  }

  create() {
    this.dialog
      .open(CrearMedicamentoComponent, { minWidth: '500px' })
      .afterClosed()
      .subscribe({
        next: (v) => {
          this.buscar();
        },
      });
  }
  crearVariante(data: MedicamentoVariantes) {
    this.dialog
      .open(CrearVarianteComponent, { minWidth: '500px', data: data })
      .afterClosed()
      .subscribe({
        next: (v) => {
          this.buscar();
        },
      });
  }

  eliminarVariante(data: Variante) {
    this.dialog
      .open(GenericDeleteDialogComponent, {
        data: {
          title: 'Eliminar',
          content: '¿Seguro que deseas eliminar esta variante?',
        },
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.medicamentoService.eliminarVariante(data._id).subscribe({
              next: (v) => {
                this.buscar();
              },
            });
          }
        },
      });
  }

  editarVariante(data: Variante) {
    this.dialog
      .open(EditarVarianteComponent, { minWidth: '500px', data: data })
      .afterClosed()
      .subscribe({
        next: (v) => {
          this.buscar();
        },
      });
  }
}
