/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GraficoMedicamentoComponent } from './grafico-medicamento.component';

describe('GraficoMedicamentoComponent', () => {
  let component: GraficoMedicamentoComponent;
  let fixture: ComponentFixture<GraficoMedicamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoMedicamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
