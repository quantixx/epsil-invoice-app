//

import { Component, Input } from '@angular/core';

//

@Component({
    selector: 'spn-ui-invoice-table',
    styleUrls: ['./table.component.scss'],
    templateUrl: './table.component.html'
})
export class TableComponent {
    @Input() public invoices: any;

    public trackId(data: any) {
        return data.id;
    }
}
