import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Compra } from './compra.mode';
import { CompraService } from '../compra.service';
import { ImageModalComponent } from '../../../../shared/image-modal/image-modal.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-ver-compra',
  templateUrl: './ver-compra.component.html',
  styleUrls: ['./ver-compra.component.scss'],
})
export class VerCompraComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public numeroOrden: string,
    private compraService: CompraService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.obtenerCompra();
  }
  compra?: Compra;
  obtenerCompra() {
    return this.compraService
      .obtenerCompraPorNumeroDeOrden(this.numeroOrden)
      .subscribe({
        next: (v) => {
          this.compra = v;
        },
      });
  }

  openImage(): void {
    this.dialog.open(ImageModalComponent, {
      data: {
        imageUrl: `${environment.api_url}/files/${this.compra?.recipe}`,
      },
      panelClass: 'custom-dialog',
    });
  }
}
