import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

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
}
