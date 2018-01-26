import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceStateInvoice } from './invoice-state-invoice.model';
import { InvoiceStateInvoicePopupService } from './invoice-state-invoice-popup.service';
import { InvoiceStateInvoiceService } from './invoice-state-invoice.service';

@Component({
    selector: 'inv-invoice-state-invoice-delete-dialog',
    templateUrl: './invoice-state-invoice-delete-dialog.component.html'
})
export class InvoiceStateInvoiceDeleteDialogComponent {

    invoiceState: InvoiceStateInvoice;

    constructor(
        private invoiceStateService: InvoiceStateInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.invoiceStateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'invoiceStateListModification',
                content: 'Deleted an invoiceState'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'inv-invoice-state-invoice-delete-popup',
    template: ''
})
export class InvoiceStateInvoiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoiceStatePopupService: InvoiceStateInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.invoiceStatePopupService
                .open(InvoiceStateInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
