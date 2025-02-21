import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

  backup() {
    this.http
      .get(`${environment.api_url}/database/backup`, {
        responseType: 'blob', // Importante para manejar archivos
      })
      .subscribe({
        next: (response) => {
          const blob = new Blob([response], {
            type: 'application/octet-stream',
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'backup.gz'; // Ajusta el nombre del archivo según corresponda
          document.body.appendChild(a);
          a.click();

          window.URL.revokeObjectURL(url);
        },
        error: (e) => {
          console.error('Error al descargar el backup:', e);
        },
      });
  }

  restore(form: FormData) {
    return this.http.post<string>(
      `${environment.api_url}/database/restore`,
      form
    );
  }
}
