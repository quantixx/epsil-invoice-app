import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BankInvoice } from './bank-invoice.model';
import { BankInvoicePopupService } from './bank-invoice-popup.service';
import { BankInvoiceService } from './bank-invoice.service';

@Component({
    selector: 'inv-bank-invoice-delete-dialog',
    templateUrl: './bank-invoice-delete-dialog.component.html'
})
export class BankInvoiceDeleteDialogComponent {

    bank: BankInvoice;

    constructor(
        private bankService: BankInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bankService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bankListModification',
                content: 'Deleted an bank'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'inv-bank-invoice-delete-popup',
    template: ''
})
export class BankInvoiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bankPopupService: BankInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bankPopupService
                .open(BankInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
