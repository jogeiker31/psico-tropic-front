import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente, ClienteService } from '../../../../shared/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarMedicamentoComponent } from './agregar-medicamento/agregar-medicamento.component';
import {
  MedicamentoService,
  VarianteFull,
} from '../../medicamento/medicamento.service';
import { CompraService } from '../compra.service';
import { Router } from '@angular/router';
import { GenericDialogComponent } from '../../../../dialogs/generic-dialog/generic-dialog.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-nueva-compra',
  templateUrl: './nueva-compra.component.html',
  styleUrls: ['./nueva-compra.component.scss'],
})
export class NuevaCompraComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private compraService: CompraService,
    private router: Router
  ) {
    this.form = this.fb.group({
      tipoCliente: ['', [Validators.required]],
      cliente: this.fb.group({
        cedula: ['', [Validators.required]],
        nombre_apellido: [{ value: '', disabled: true }],
        direccion: [{ value: '', disabled: true }],
        telefono: [{ value: '', disabled: true }],
      }),
    });
  }

  ngOnInit() {}

  medicamentos: {
    cantidad: number;
    medicamento: VarianteFull;
    limite?: number;
  }[] = [];

  cliente?: Cliente;
  buscarCliente() {
    const clienteForm = this.form.controls['cliente'] as FormGroup;

    this.clienteService
      .obtenerPorCedula(clienteForm.controls['cedula'].value)
      .subscribe({
        next: (cliente) => {
          this.cliente = cliente;
          this.form.patchValue({
            cliente: {
              nombre_apellido: cliente.nombre_apellido || '',
              direccion: cliente.direccion || '',
              telefono: cliente.telefono || '',
            },
          });

          clienteForm.get('nombre_apellido')?.enable();
          clienteForm.get('direccion')?.enable();
          clienteForm.get('telefono')?.enable();
        },
      });
  }

  get invalid() {
    return (
      this.form.invalid ||
      this.medicamentos.length == 0 ||
      !this.cliente ||
      this.medicamentos.find((e) => e.cantidad < 1)
    );
  }

  agregarMedicamento() {
    this.dialog
      .open(AgregarMedicamentoComponent, {
        width: '500px',
        maxHeight: '700px',
      })
      .afterClosed()
      .subscribe({
        next: (value: VarianteFull) => {
          if (value) {
            this.medicamentos.push({
              cantidad: 1,
              medicamento: value,
            });
          }
        },
      });
  }

  async validar() {
    const value = this.form.value;
    console.log(this.medicamentos);
    for (let index = 0; index < this.medicamentos.length; index++) {
      try {
        const element = this.medicamentos[index];
        const result: any = await firstValueFrom(
          this.compraService.validar(
            value.cliente.cedula,
            element.medicamento._id,
            element.cantidad,
            value.tipoCliente
          )
        );
        element.limite = result['puedeComprar'] as number;
        console.log('buscando');
      } catch (error) {}
    }

    if (
      this.medicamentos.filter((e) => e.limite && e.cantidad > e.limite)
        .length > 0
    ) {
      return false;
    } else {
      return true;
    }
  }

  remover(id: string) {
    this.medicamentos = this.medicamentos.filter(
      (e) => e.medicamento._id != id
    );
  }

  async generar() {
    const value = this.form.value;

    if (await this.validar()) {
      this.compraService
        .generar({
          ...value,
          medicamentos: this.medicamentos.map((e) => {
            return { id: e.medicamento._id, cantidad: e.cantidad };
          }),
        })
        .subscribe({
          next: (v) => {
            this.dialog
              .open(GenericDialogComponent, {
                data: {
                  title: 'Compra realizada',
                  content: 'La compra se ha registrado con éxito',
                },
              })
              .afterClosed()
              .subscribe({
                next: () => {
                  this.router.navigate(['/app/compras']);
                },
              });
          },
          error: (e) => {
            this.dialog.open(GenericDialogComponent, {
              data: {
                title: 'Error',
                content: 'No se pudo generar la compra debido a limitaciones',
              },
            });
          },
        });
    }
  }
}
