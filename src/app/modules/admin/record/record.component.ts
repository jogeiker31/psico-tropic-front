import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RecordService } from './record.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-record',

  templateUrl: './record.component.html',
  styleUrl: './record.component.scss',
})
export class RecordComponent {
  private apiUrl = 'http://localhost:3000';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private recordService: RecordService, private fb: FormBuilder) {
    this.form = this.fb.group({
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
    });
  }

  form: FormGroup;

  displayedColumns: string[] = ['user', 'action', 'date'];
  dataSource = new MatTableDataSource<any>([]);
  ngOnInit() {}

  searchRecord() {
    const { start, end } = this.form?.value;
    this.recordService.getRecord(start, end);
    this.dataSource.paginator = this.paginator;
    this.recordService.$record.subscribe({
      next: (value) => {
        this.dataSource = new MatTableDataSource(value);
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const filterText = filter.trim().toLowerCase();

          // Formatear la fecha al mismo formato que se muestra en la tabla
          const formattedDate = new Date(data.createdAt).toLocaleString(
            'es-ES',
            {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            }
          );

          return (
            data.user.name.toLowerCase().includes(filterText) ||
            data.user.email.toLowerCase().includes(filterText) ||
            formattedDate.includes(filterText) ||
            data.action.toLowerCase().includes(filterText)
          );
        };
      },
    });
  }

  download() {
    const { start, end } = this.form?.value;
    window.open(
      environment.api_url +
        `/record/generate-pdf?startDate=${start}&endDate=${end}`
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
