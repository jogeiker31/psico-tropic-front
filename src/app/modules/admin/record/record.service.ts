import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  constructor(private http: HttpClient) {}

  record: any[] = [];

  $record = new Subject<any>();
  getRecord(start: string, end: string) {
    const token = localStorage.getItem('token');

    this.http
      .get<any[]>(`${environment.api_url}/record`, { params: { start, end } })
      .subscribe({
        next: (value) => {
          console.log(value);
          this.record = value;
          this.$record.next(this.record);
        },
        error: (e) => {},
      });
  }
}
