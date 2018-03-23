//

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

//

@Component({
  selector: 'epsil-playground-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public data: object;

  constructor(private http: HttpClient) {}

  public ngOnInit() {
    this.data = this.http.get('http://localhost:5555/invoices');
  }
}
