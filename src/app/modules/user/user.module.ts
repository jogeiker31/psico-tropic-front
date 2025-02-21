import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MaterialsModule } from '../../materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePostulationComponent } from './create-postulation/create-postulation.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { PreviewBookCardComponent } from './marketplace/preview-book-card/preview-book-card.component';
import { FileViewPipe } from '../../file-view.pipe';
import { PreviewBookComponent } from './marketplace/preview-book/preview-book.component';
import { BuyBookComponent } from './buy/buy-book/buy-book.component';
import { UserBooksComponent } from './user-books/user-books.component';
import { UserBookCardComponent } from './user-books/user-book-card/user-book-card.component';
import { BookViewComponent } from './user-books/book-view/book-view.component';
import { NotificationDialogComponent } from '../shared_components/notification-dialog/notification-dialog.component';
import { BuyMembershipComponent } from './buy/buy-membership/buy-membership.component';
import { MedicamentoComponent } from './medicamento/medicamento.component';
import { CrearMedicamentoComponent } from './medicamento/crear-medicamento/crear-medicamento.component';
import { CrearVarianteComponent } from './medicamento/crear-variante/crear-variante.component';
import { EditarVarianteComponent } from './medicamento/editar-variante/editar-variante.component';
import { ComprasComponent } from './compras/compras.component';
import { NuevaCompraComponent } from './compras/nueva-compra/nueva-compra.component';
import { AgregarMedicamentoComponent } from './compras/nueva-compra/agregar-medicamento/agregar-medicamento.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    FileViewPipe,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'medicamentos',
        component: MedicamentoComponent,
      },
      {
        path: 'compras',
        component: ComprasComponent,
      },
      {
        path: 'compras/nueva',
        component: NuevaCompraComponent,
      },
    ]),
  ],
  declarations: [
    CreatePostulationComponent,
    PreviewBookCardComponent,
    MarketplaceComponent,
    PreviewBookComponent,
    BuyBookComponent,
    CrearMedicamentoComponent,
    UserBooksComponent,
    UserBookCardComponent,
    BookViewComponent,
    HomeComponent,
    BuyMembershipComponent,
    MedicamentoComponent,
    CrearVarianteComponent,
    EditarVarianteComponent,
    ComprasComponent,
    NuevaCompraComponent,
    AgregarMedicamentoComponent,
  ],
})
export class UserModule {}
