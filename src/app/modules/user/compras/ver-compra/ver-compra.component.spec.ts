/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VerCompraComponent } from './ver-compra.component';

describe('VerCompraComponent', () => {
  let component: VerCompraComponent;
  let fixture: ComponentFixture<VerCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
