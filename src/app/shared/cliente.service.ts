import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ClienteMedicamentos } from '../modules/user/cliente/medicamento-cliente.model';
import { ClienteCompras } from '../modules/user/cliente/cliente-compras.model';

// To parse this data:
//
//   import { Convert, Cliente } from "./file";
//
//   const cliente = Convert.toCliente(json);

export interface Cliente {
  _id: string;
  cedula: string;
  direccion: string;
  nombre_apellido: string;
  telefono: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toCliente(json: string): Cliente {
    return JSON.parse(json);
  }

  public static clienteToJson(value: Cliente): string {
    return JSON.stringify(value);
  }
}

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  obtenerPorCedula(cedula: string) {
    return this.http.get<Cliente>(
      `${environment.api_url}/cliente/cedula/${cedula}`
    );
  }
  buscarClientes(query: string) {
    return this.http.get<Cliente[]>(`${environment.api_url}/cliente/buscar`, {
      params: { query },
    });
  }
  buscarClientesPorId(id: string) {
    return this.http.get<Cliente>(`${environment.api_url}/cliente/id/${id}`);
  }

  clienteMedicamentosComprados(id: string) {
    return this.http.get<ClienteMedicamentos[]>(
      `${environment.api_url}/compra/medicamentos-cliente/${id}`
    );
  }
  clienteCompras(id: string) {
    return this.http.get<ClienteCompras[]>(
      `${environment.api_url}/compra/compras-cliente/${id}`
    );
  }
}
