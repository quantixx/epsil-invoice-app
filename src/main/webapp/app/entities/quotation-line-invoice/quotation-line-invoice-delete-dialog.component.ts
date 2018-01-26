import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { QuotationLineInvoice } from './quotation-line-invoice.model';
import { QuotationLineInvoicePopupService } from './quotation-line-invoice-popup.service';
import { QuotationLineInvoiceService } from './quotation-line-invoice.service';

@Component({
    selector: 'inv-quotation-line-invoice-delete-dialog',
    templateUrl: './quotation-line-invoice-delete-dialog.component.html'
})
export class QuotationLineInvoiceDeleteDialogComponent {

    quotationLine: QuotationLineInvoice;

    constructor(
        private quotationLineService: QuotationLineInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.quotationLineService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'quotationLineListModification',
                content: 'Deleted an quotationLine'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'inv-quotation-line-invoice-delete-popup',
    template: ''
})
export class QuotationLineInvoiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private quotationLinePopupService: QuotationLineInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.quotationLinePopupService
                .open(QuotationLineInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
