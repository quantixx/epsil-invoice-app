import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceLineInvoice } from './invoice-line-invoice.model';
import { InvoiceLineInvoicePopupService } from './invoice-line-invoice-popup.service';
import { InvoiceLineInvoiceService } from './invoice-line-invoice.service';

@Component({
    selector: 'inv-invoice-line-invoice-delete-dialog',
    templateUrl: './invoice-line-invoice-delete-dialog.component.html'
})
export class InvoiceLineInvoiceDeleteDialogComponent {

    invoiceLine: InvoiceLineInvoice;

    constructor(
        private invoiceLineService: InvoiceLineInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.invoiceLineService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'invoiceLineListModification',
                content: 'Deleted an invoiceLine'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'inv-invoice-line-invoice-delete-popup',
    template: ''
})
export class InvoiceLineInvoiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoiceLinePopupService: InvoiceLineInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.invoiceLinePopupService
                .open(InvoiceLineInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
