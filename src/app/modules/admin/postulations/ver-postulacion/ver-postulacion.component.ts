import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-ver-postulacion',
  templateUrl: './ver-postulacion.component.html',
  styleUrls: ['./ver-postulacion.component.scss'],
})
export class VerPostulacionComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private userService: UsersService,
    private dialog: MatDialogRef<VerPostulacionComponent>
  ) {}

  get postulation() {
    return this.data;
  }
  ngOnInit() {}

  decline() {
   
  }
  accept() {
  
  }
}
