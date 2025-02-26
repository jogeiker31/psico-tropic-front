import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-medicamento',
  templateUrl: './grafico-medicamento.component.html',
  styleUrls: ['./grafico-medicamento.component.scss']
})
export class GraficoMedicamentoComponent implements OnInit {

  @Input() datosMedicamentos: { nombre: string; cantidad: number }[] = [];

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  public pieChartLabels: string[] = [];
  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{ data: [] }],
  };
  // public pieChartType: ChartType = ChartType.;

  ngOnInit(): void {
    this.actualizarGrafico();
  }

  ngOnChanges(): void {
    this.actualizarGrafico();
  }

  actualizarGrafico(): void {
    this.pieChartLabels = this.datosMedicamentos.map((item) => item.nombre);
    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [{ data: this.datosMedicamentos.map((item) => item.cantidad) }],
    };
  }

}
