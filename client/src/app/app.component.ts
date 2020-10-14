import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pagination } from './models/pagination';
import { IProduct } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skynet';
  products: Array<IProduct>;
  constructor(private http: HttpClient) {

  }

  ngOnInit() {

    this.http.get('http://localhost:58421/api/products').subscribe((resp: Pagination) => {
      this.products = resp.data;
    });
  }
}


