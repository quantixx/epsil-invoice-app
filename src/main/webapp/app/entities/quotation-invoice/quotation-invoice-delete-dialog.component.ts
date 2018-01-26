import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { QuotationInvoice } from './quotation-invoice.model';
import { QuotationInvoicePopupService } from './quotation-invoice-popup.service';
import { QuotationInvoiceService } from './quotation-invoice.service';

@Component({
    selector: 'inv-quotation-invoice-delete-dialog',
    templateUrl: './quotation-invoice-delete-dialog.component.html'
})
export class QuotationInvoiceDeleteDialogComponent {

    quotation: QuotationInvoice;

    constructor(
        private quotationService: QuotationInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.quotationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'quotationListModification',
                content: 'Deleted an quotation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'inv-quotation-invoice-delete-popup',
    template: ''
})
export class QuotationInvoiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private quotationPopupService: QuotationInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.quotationPopupService
                .open(QuotationInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
