import { Component, OnInit } from '@angular/core';
import { UserBooksService } from '../services/user-books.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
})
export class MarketplaceComponent implements OnInit {
  constructor(private booksService: UserBooksService) {}

  get books() {
    return this.booksService.books;
  }
  ngOnInit() {
    this.booksService.getbooks();
  }
}
