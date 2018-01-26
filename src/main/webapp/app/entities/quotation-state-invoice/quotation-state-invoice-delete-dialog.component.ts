import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { QuotationStateInvoice } from './quotation-state-invoice.model';
import { QuotationStateInvoicePopupService } from './quotation-state-invoice-popup.service';
import { QuotationStateInvoiceService } from './quotation-state-invoice.service';

@Component({
    selector: 'inv-quotation-state-invoice-delete-dialog',
    templateUrl: './quotation-state-invoice-delete-dialog.component.html'
})
export class QuotationStateInvoiceDeleteDialogComponent {

    quotationState: QuotationStateInvoice;

    constructor(
        private quotationStateService: QuotationStateInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.quotationStateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'quotationStateListModification',
                content: 'Deleted an quotationState'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'inv-quotation-state-invoice-delete-popup',
    template: ''
})
export class QuotationStateInvoiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private quotationStatePopupService: QuotationStateInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.quotationStatePopupService
                .open(QuotationStateInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
