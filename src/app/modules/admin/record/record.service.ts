import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  record: any[] = [];

  $record = new Subject<any>();
  getRecord(start: string, end: string) {
    const token = localStorage.getItem('token');

    this.http
      .get<any[]>(`${this.apiUrl}/record`, { params: { start, end } })
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
