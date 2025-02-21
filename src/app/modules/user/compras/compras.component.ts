import { Component, OnInit } from '@angular/core';
import { CompraPreview, CompraService } from './compra.service';
import { MatTableDataSource } from '@angular/material/table';
import { VerCompraComponent } from './ver-compra/ver-compra.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss'],
})
export class ComprasComponent implements OnInit {
  constructor(
    private compraService: CompraService,
    private dialog: MatDialog
  ) {}

  displayedColumns: string[] = [
    'order',
    'cliente',
    'doctor',
    'medicamentos',
    'date',
  ];
  dataSource = new MatTableDataSource<any>([]);
  ngOnInit() {
    this.obtenerCompras();
  }

  compras: CompraPreview[] = [];

  verCompra(compra: CompraPreview) {
    this.dialog.open(VerCompraComponent, { data: compra.numero_orden ,width:"500px",maxHeight:"600px"});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obtenerCompras() {
    this.compraService.obtenerCompras().subscribe({
      next: (value) => {
        this.compras = value;

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
            data.cliente.nombre_apellido.toLowerCase().includes(filterText) ||
            data.cliente.cedula.toLowerCase().includes(filterText) ||
            data.doctor.nombre_apellido.toLowerCase().includes(filterText) ||
            data.numero_orden.toLowerCase().includes(filterText) ||
            data.doctor.codigo_colaborador.toLowerCase().includes(filterText) ||
            data.medicamentos
              .map((e: any) => e.id.principio_activo.principio_activo)
              .join()
              .toLowerCase()
              .includes(filterText) ||
            formattedDate.includes(filterText)
          );
        };
      },
      error: (e) => {},
    });
  }
}
