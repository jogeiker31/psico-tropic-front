import { Component, OnInit } from '@angular/core';
import { MetricsService } from './metrics.service';
import { Metrics } from './metrics.model';

@Component({
  selector: 'app-dashboard',

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  metrics?: Metrics;
  constructor(private metricsService: MetricsService) {}
  ngOnInit(): void {
    this.metricsService.get().subscribe({
      next: (value) => {
        this.metrics = value;
      },
    });
  }
}
