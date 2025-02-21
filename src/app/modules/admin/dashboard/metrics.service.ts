import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Metrics } from './metrics.model';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<Metrics>(`${environment.api_url}/metrics`);
  }
}
