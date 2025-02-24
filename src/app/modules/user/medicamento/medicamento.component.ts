import { Component, OnInit } from '@angular/core';
import {
  MedicamentoService,
  MedicamentoVariantes,
  PrincipioActivo,
  Variante,
} from './medicamento.service';
import { CrearMedicamentoComponent } from './crear-medicamento/crear-medicamento.component';
import { MatDialog } from '@angular/material/dialog';
import { CrearVarianteComponent } from './crear-variante/crear-variante.component';
import { EditarVarianteComponent } from './editar-variante/editar-variante.component';
import { GenericDeleteDialogComponent } from '../../../dialogs/generic-delete-dialog/generic-delete-dialog.component';
import { EditarMedicamentoComponent } from './editar-medicamento/editar-medicamento.component';

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

  medicamentosSolos: PrincipioActivo[] = [];
  medicamentos: Variante[] = [];
  buscar() {
    this.medicamentos = [];
    this.seleccionada = undefined;
    this.medicamentoService.obtenerMedicamentos().subscribe({
      next: (data) => {
        this.medicamentosSolos = data;
      },
    });
  }

  seleccionada?: PrincipioActivo;
  seleccionar(select: PrincipioActivo) {
    this.seleccionada = select;
    this.medicamentos = [];
    this.medicamentoService.obtenerVariantes(select._id).subscribe({
      next: (v) => {
        this.medicamentos = v;
      },
    });
  }

  delete(medicamento: PrincipioActivo) {
    this.dialog
      .open(GenericDeleteDialogComponent, {
        data: {
          title: 'Eliminar medicamento',
          content: '¿Seguro que quieres borrar este medicamento?',
        },
      })

      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!v) return;
          this.medicamentoService
            .eliminarMedicamento(medicamento._id)
            .subscribe({
              next: (v) => {
                this.buscar();
              },
            });
        },
      });
  }

  Editar(medicamento: PrincipioActivo) {
    this.dialog
      .open(EditarMedicamentoComponent, {
        data: medicamento,
      })

      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.buscar();
          }
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

  crearVariante() {
    this.dialog
      .open(CrearVarianteComponent, {
        minWidth: '500px',
        data: this.seleccionada,
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          this.seleccionar(this.seleccionada!);
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
                this.seleccionar(this.seleccionada!);
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
          this.seleccionar(this.seleccionada!);
        },
      });
  }
}
