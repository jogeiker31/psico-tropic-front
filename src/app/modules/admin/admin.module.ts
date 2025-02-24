import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { MaterialsModule } from '../../materials/materials.module';
import { AddCategorieComponent } from './categories/add-categorie/add-categorie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecordComponent } from './record/record.component';
import { EditCategorieComponent } from './categories/edit-categorie/edit-categorie.component';
import { UsersComponent } from './users/users.component';
import { PostulationsComponent } from './postulations/postulations.component';
import { VerPostulacionComponent } from './postulations/ver-postulacion/ver-postulacion.component';
import { Status_postulationPipe } from './postulations/status_postulation.pipe';
import { BooksComponent } from './books/books.component';
import { CreateBookComponent } from './books/create-book/create-book.component';
import { BookCardAdminComponent } from './books/book-card-admin/book-card-admin.component';
import { FileViewPipe } from '../../file-view.pipe';
import { EditBookComponent } from './books/edit-book/edit-book.component';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { BooksTransactionsComponent } from './transactions/books-transactions/books-transactions.component';
import { TransactionBookDetailsComponent } from './transactions/books-transactions/transaction-book-details/transaction-book-details.component';
import { ImageModalComponent } from '../../shared/image-modal/image-modal.component';
import { MembershipsTransactionsComponent } from './memberships-transactions/memberships-transactions.component';
import { TransactionMembershipDetailComponent } from './memberships-transactions/transaction-membership-detail/transaction-membership-detail.component';
import { BanksComponent } from './banks/banks.component';
import { BankCardComponent } from './banks/bank-card/bank-card.component';
import { CreateBankAccountComponent } from './banks/create-bank-account/create-bank-account.component';
import { EditBankComponent } from './banks/edit-bank/edit-bank.component';
import { DatabaseComponent } from './database/database.component';
import { CreateDoctorComponent } from './users/create-doctor/create-doctor.component';
import { EditDoctorComponent } from './users/edit-doctor/edit-doctor.component';
import { MonthYearPipe } from '../../month-year.pipe';
registerLocaleData(localeEs);
@NgModule({
  declarations: [
    CategoriesComponent,
    AddCategorieComponent,
    RecordComponent,
    EditCategorieComponent,
    UsersComponent,
    PostulationsComponent,
    VerPostulacionComponent,
    Status_postulationPipe,
    CreateBookComponent,
    BooksComponent,
    BookCardAdminComponent,
    EditBookComponent,
    BooksTransactionsComponent,
    TransactionBookDetailsComponent,
    ImageModalComponent,
    MembershipsTransactionsComponent,
    TransactionMembershipDetailComponent,
    BankCardComponent,
    BanksComponent,
    CreateBankAccountComponent,
    EditBankComponent,
    DashboardComponent,
    DatabaseComponent,
    CreateDoctorComponent,
    EditDoctorComponent,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' },
    Status_postulationPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    MaterialsModule,
    FileViewPipe,
    ReactiveFormsModule,
    MonthYearPipe,
    FormsModule,

    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'usuarios',
        component: UsersComponent,
      },
      {
        path: 'postulaciones',
        component: PostulationsComponent,
      },
      {
        path: 'categorias',
        component: CategoriesComponent,
      },
      {
        path: 'bitacora',
        component: RecordComponent,
      },
      {
        path: 'libros',
        component: BooksComponent,
      },
      {
        path: 'libros/compras',
        component: BooksTransactionsComponent,
      },
      {
        path: 'membresias/compras',
        component: MembershipsTransactionsComponent,
      },
      {
        path: 'banks',
        component: BanksComponent,
      },
      {
        path: 'database',
        component: DatabaseComponent,
      },
    ]),
  ],
})
export class AdminModule {}
