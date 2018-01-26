import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CurrencyInvoice } from './currency-invoice.model';
import { CurrencyInvoicePopupService } from './currency-invoice-popup.service';
import { CurrencyInvoiceService } from './currency-invoice.service';

@Component({
    selector: 'inv-currency-invoice-delete-dialog',
    templateUrl: './currency-invoice-delete-dialog.component.html'
})
export class CurrencyInvoiceDeleteDialogComponent {

    currency: CurrencyInvoice;

    constructor(
        private currencyService: CurrencyInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.currencyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'currencyListModification',
                content: 'Deleted an currency'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'inv-currency-invoice-delete-popup',
    template: ''
})
export class CurrencyInvoiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private currencyPopupService: CurrencyInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.currencyPopupService
                .open(CurrencyInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
