import { Component, OnInit } from '@angular/core';
import { MetricsService } from './metrics.service';
import { Metricas } from './metrics.model';
import { MetricasMedicamentoMes } from './metris-medicamento-mes.model';

@Component({
  selector: 'app-dashboard',

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  metrics?: Metricas;
  metricsMonth?: MetricasMedicamentoMes;
  constructor(private metricsService: MetricsService) {}
  ngOnInit(): void {
    this.metricsService.get().subscribe({
      next: (value) => {
        this.metrics = value;
      },
    });

    this.buscarPorMes();
  }

  buscarPorMes() {
    this.metricsService.getMedicamentoMes(this.date).subscribe({
      next: (v) => {
        this.metricsMonth = v;
      },
    });
  }

  date = new Date();
  get fecha() {
    return `${this.date.getMonth() + 1}/${this.date.getFullYear()}`;
  }
  next(direccion: number) {
    this.date.setMonth(this.date.getMonth() + direccion);
    this.buscarPorMes();
  }
}
