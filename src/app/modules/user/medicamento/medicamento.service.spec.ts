/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MedicamentoService } from './medicamento.service';

describe('Service: Medicamento', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicamentoService]
    });
  });

  it('should ...', inject([MedicamentoService], (service: MedicamentoService) => {
    expect(service).toBeTruthy();
  }));
});
