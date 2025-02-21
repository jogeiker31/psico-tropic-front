import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-referent-layout',
  templateUrl: './referent-layout.component.html',
  styleUrls: ['./referent-layout.component.scss'],
})
export class ReferentLayoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
    authService.getUserData();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  get user() {
    return this.authService.user;
  }

  logout() {
    localStorage.clear();
    this.authService.user = null;
    this.router.navigate(['']);
  }
}
