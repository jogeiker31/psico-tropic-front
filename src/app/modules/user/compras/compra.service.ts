import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Cliente } from '../../../shared/cliente.service';
import { Compra } from './ver-compra/compra.mode';

// To parse this data:
//
//   import { Convert } from "./file";
//
//   const compraPreview = Convert.toCompraPreview(json);

export interface CompraPreview {
  _id: string;
  doctor: Doctor;
  cliente: Cliente;
  tipoCliente: string;
  medicamentos: Medicamento[];
  numero_orden: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Doctor {
  _id: string;
  nombre_apellido: string;
  cedula: string;
  codigo_farmaceutico: string;
  codigo_colaborador: string;
  nombre_usuario: string;
  role: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Medicamento {
  id: ID;
  cantidad: number;
}

export interface ID {
  _id: string;
  principio_activo: PrincipioActivo;
  marca: string;
}

export interface PrincipioActivo {
  _id: string;
  principio_activo: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toCompraPreview(json: string): CompraPreview[] {
    return JSON.parse(json);
  }

  public static compraPreviewToJson(value: CompraPreview[]): string {
    return JSON.stringify(value);
  }
}

@Injectable({
  providedIn: 'root',
})
export class CompraService {
  constructor(private http: HttpClient) {}

  generar(data: any) {
    return this.http.post(`${environment.api_url}/compra`, data);
  }

  validar(
    cedula: string,
    varianteId: string,
    cantidad: number,
    tipoCliente: string
  ) {
    return this.http.get(`${environment.api_url}/compra/validar`, {
      params: { cedula, varianteId, cantidad, tipoCliente },
    });
  }

  obtenerCompras() {
    return this.http.get<CompraPreview[]>(`${environment.api_url}/compra`);
  }
  obtenerCompraPorNumeroDeOrden(numero_orden: string) {
    return this.http.get<Compra>(
      `${environment.api_url}/compra/numero-orden/${numero_orden}`
    );
  }
}
