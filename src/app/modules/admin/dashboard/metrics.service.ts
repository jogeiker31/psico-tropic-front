import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Metricas } from './metrics.model';
import { MetricasMedicamentoMes } from './metris-medicamento-mes.model';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<Metricas>(`${environment.api_url}/metrics`);
  }
  getMedicamentoMes(date: Date) {
    return this.http.get<MetricasMedicamentoMes>(
      `${environment.api_url}/metrics/by-month/${date}`
    );
  }
}
