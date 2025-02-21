import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private url = environment.api_url;
  constructor(private http: HttpClient) {}

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.url + '/files/upload', formData);
  }
  download(file: string) {
    window.open(this.url + '/files/view/' + file, '_blank');
    // return this.http.get(this.url + '/files/download/' + file).subscribe({
    //   next: (value) => {
    //     console.log(value);
    //   },
    // });
  }
}
