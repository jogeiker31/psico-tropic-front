import { Component, OnInit } from '@angular/core';
import {
  MedicamentoService,
  VarianteFull,
} from '../../../medicamento/medicamento.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-medicamento',
  templateUrl: './agregar-medicamento.component.html',
  styleUrls: ['./agregar-medicamento.component.scss'],
})
export class AgregarMedicamentoComponent implements OnInit {
  constructor(
    private medicamentoService: MedicamentoService,
    private dialogRef: MatDialogRef<AgregarMedicamentoComponent>
  ) {}

  ngOnInit() {}

  query = '';

  variantes: VarianteFull[] = [];
  buscar() {
    this.medicamentoService.buscarVariantes(this.query).subscribe({
      next: (data) => {
        this.variantes = data;
      },
    });
  }

  agregar(variante: VarianteFull) {
    this.dialogRef.close(variante);
  }
}
