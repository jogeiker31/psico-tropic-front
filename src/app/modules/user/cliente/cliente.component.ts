import { Component, OnInit } from '@angular/core';
import { Cliente, ClienteService } from '../../../shared/cliente.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit() {}

  query = '';
  buscar() {
    this.clienteService.buscarClientes(this.query).subscribe({
      next: (v) => {
        this.dataSource = new MatTableDataSource(v);
      },
      error: (e) => {},
    });
  }

  displayedColumns: string[] = [
    'cedula',
    'nombre',
    'direccion',
    'telefono',
    'options',
  ];
  dataSource = new MatTableDataSource<Cliente>([]);

  verCliente(cliente: Cliente) {
    this.router.navigate(['/app/clientes/ver'], {
      queryParams: { id: cliente._id },
    });
  }
}
