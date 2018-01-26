import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceDefinitionInvoice } from './invoice-definition-invoice.model';
import { InvoiceDefinitionInvoicePopupService } from './invoice-definition-invoice-popup.service';
import { InvoiceDefinitionInvoiceService } from './invoice-definition-invoice.service';

@Component({
    selector: 'inv-invoice-definition-invoice-delete-dialog',
    templateUrl: './invoice-definition-invoice-delete-dialog.component.html'
})
export class InvoiceDefinitionInvoiceDeleteDialogComponent {

    invoiceDefinition: InvoiceDefinitionInvoice;

    constructor(
        private invoiceDefinitionService: InvoiceDefinitionInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.invoiceDefinitionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'invoiceDefinitionListModification',
                content: 'Deleted an invoiceDefinition'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'inv-invoice-definition-invoice-delete-popup',
    template: ''
})
export class InvoiceDefinitionInvoiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoiceDefinitionPopupService: InvoiceDefinitionInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.invoiceDefinitionPopupService
                .open(InvoiceDefinitionInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
