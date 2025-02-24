import { Component, OnInit } from '@angular/core';
import { Cliente, ClienteService } from '../../../../shared/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { ClienteMedicamentos } from '../medicamento-cliente.model';
import { ClienteCompras } from '../cliente-compras.model';
import { MatDialog } from '@angular/material/dialog';
import { VerCompraComponent } from '../../compras/ver-compra/ver-compra.component';

@Component({
  selector: 'app-ver-cliente',
  templateUrl: './ver-cliente.component.html',
  styleUrls: ['./ver-cliente.component.scss'],
})
export class VerClienteComponent implements OnInit {
  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  cliente?: Cliente;
  ngOnInit() {
    const id = this.route.snapshot.queryParamMap.get('id') || '';

    if (id) {
      this.clienteService.buscarClientesPorId(id).subscribe({
        next: (data) => {
          this.cliente = data;
          this.getData();
        },
      });
    }
  }

  medicamentos: ClienteMedicamentos[] = [];
  compras: ClienteCompras[] = [];

  getData() {
    this.clienteService
      .clienteMedicamentosComprados(this.cliente!._id)
      .subscribe({
        next: (v) => {
          this.medicamentos = v;
        },
      });
    this.clienteService.clienteCompras(this.cliente!._id).subscribe({
      next: (v) => {
        this.compras = v;
      },
    });
  }

  verFactura(numero_orden: string) {
    this.dialog.open(VerCompraComponent, {
      data: numero_orden,
      width: '500px',
      maxHeight: '600px',
    });
  }
}
