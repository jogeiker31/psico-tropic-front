/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VerPostulacionComponent } from './ver-postulacion.component';

describe('VerPostulacionComponent', () => {
  let component: VerPostulacionComponent;
  let fixture: ComponentFixture<VerPostulacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPostulacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPostulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
