//

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

//

@Component({
    selector: 'spn-ui-invoice-table-view',
    styleUrls: ['./table-view.component.scss'],
    templateUrl: './table-view.component.html'
})
export class TableViewComponent implements OnInit {
    public invoices$: Observable<any>;

    constructor(private http: HttpClient) {}

    public ngOnInit() {
        this.invoices$ = this.http.get('http://localhost:5555/invoices');
    }
}
