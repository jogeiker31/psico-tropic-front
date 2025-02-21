import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from '../../materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReferentHomeComponent } from './referent-home/referent-home.component';
import { ReferentLayoutComponent } from './referent-layout/referent-layout.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forChild([
      {
        path: '',
        component: ReferentHomeComponent,
      },
    ]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ReferentHomeComponent, ReferentLayoutComponent],
})
export class ReferentModule {}
