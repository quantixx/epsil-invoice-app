import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { QuotationDefinitionInvoice } from './quotation-definition-invoice.model';
import { QuotationDefinitionInvoicePopupService } from './quotation-definition-invoice-popup.service';
import { QuotationDefinitionInvoiceService } from './quotation-definition-invoice.service';

@Component({
    selector: 'inv-quotation-definition-invoice-delete-dialog',
    templateUrl: './quotation-definition-invoice-delete-dialog.component.html'
})
export class QuotationDefinitionInvoiceDeleteDialogComponent {

    quotationDefinition: QuotationDefinitionInvoice;

    constructor(
        private quotationDefinitionService: QuotationDefinitionInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.quotationDefinitionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'quotationDefinitionListModification',
                content: 'Deleted an quotationDefinition'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'inv-quotation-definition-invoice-delete-popup',
    template: ''
})
export class QuotationDefinitionInvoiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private quotationDefinitionPopupService: QuotationDefinitionInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.quotationDefinitionPopupService
                .open(QuotationDefinitionInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
