import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { BankAccountModel } from './models/bank-account.model';

@Injectable({
  providedIn: 'root',
})
export class BankAccountsService {
  private url = environment.api_url;
  constructor(private http: HttpClient) {}

  banks: BankAccountModel[] = [];

  $banks = new Subject<BankAccountModel[]>();
  getbanks() {
    this.http.get<BankAccountModel[]>(`${this.url}/bank-account`).subscribe({
      next: (value) => {
        this.banks = value;
        this.$banks.next(this.banks);
      },
      error: (e) => {},
    });
  }

  create(data: any) {
    return this.http.post<BankAccountModel>(
      `${environment.api_url}/bank-account`,
      data
    );
  }
  update(id: string, data: any) {
    return this.http.patch<BankAccountModel>(
      `${environment.api_url}/bank-account/${id}`,
      data
    );
  }
  delete(id: any) {
    return this.http.delete<BankAccountModel>(
      `${environment.api_url}/bank-account/${id}`
    );
  }
}
