import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceInvoice } from './invoice-invoice.model';
import { InvoiceInvoicePopupService } from './invoice-invoice-popup.service';
import { InvoiceInvoiceService } from './invoice-invoice.service';

@Component({
    selector: 'inv-invoice-invoice-delete-dialog',
    templateUrl: './invoice-invoice-delete-dialog.component.html'
})
export class InvoiceInvoiceDeleteDialogComponent {

    invoice: InvoiceInvoice;

    constructor(
        private invoiceService: InvoiceInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.invoiceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'invoiceListModification',
                content: 'Deleted an invoice'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'inv-invoice-invoice-delete-popup',
    template: ''
})
export class InvoiceInvoiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoicePopupService: InvoiceInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.invoicePopupService
                .open(InvoiceInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
