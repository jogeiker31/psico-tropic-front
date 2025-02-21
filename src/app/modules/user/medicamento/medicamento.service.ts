import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

// To parse this data:
//
//   import { Convert } from "./file";
//
//   const medicamentoVariantes = Convert.toMedicamentoVariantes(json);

export interface MedicamentoVariantes {
  _id: string;
  principio_activo: string;
  limite: number;
  variantes: Variante[];
}

export interface Variante {
  _id: string;
  marca: string;
  presentacion: string;
  numero_tabletas: string;
  importado: boolean;
  descripcion: string;
  foto: string;
  documento_requerido: string;
}

// To parse this data:
//
//   import { Convert } from "./file";
//
//   const varianteFull = Convert.toVarianteFull(json);

export interface VarianteFull {
  _id: string;
  principio_activo: PrincipioActivo;
  foto: string;
  marca: string;
  presentacion: string;
  numero_tabletas: string;
  importado: boolean;
  descripcion: string;
  documento_requerido: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  deleted: boolean;
}

export interface PrincipioActivo {
  _id: string;
  principio_activo: string;
  limite: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

@Injectable({
  providedIn: 'root',
})
export class MedicamentoService {
  constructor(private http: HttpClient) {}

  obtenerMedicamentos() {
    return this.http.get<MedicamentoVariantes[]>(
      `${environment.api_url}/medicamento/variantes`
    );
  }

  crear(data: any) {
    return this.http.post<MedicamentoVariantes>(
      `${environment.api_url}/medicamento`,
      data
    );
  }
  crearVariante(data: any) {
    return this.http.post<Variante>(
      `${environment.api_url}/medicamento/variante`,
      data
    );
  }
  editarVariante(id: string, data: any) {
    return this.http.patch<Variante>(
      `${environment.api_url}/medicamento/variante/${id}`,
      data
    );
  }
  eliminarVariante(id: string) {
    return this.http.delete<Variante>(
      `${environment.api_url}/medicamento/variante/${id}`
    );
  }
  buscarVariantes(query: string) {
    return this.http.get<VarianteFull[]>(
      `${environment.api_url}/medicamento/buscar`,
      {
        params: { query },
      }
    );
  }

  puedeComprar(){
    
  }
}
