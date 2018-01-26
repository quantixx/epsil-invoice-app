import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CurrencyInvoice } from './currency-invoice.model';
import { CurrencyInvoicePopupService } from './currency-invoice-popup.service';
import { CurrencyInvoiceService } from './currency-invoice.service';

@Component({
    selector: 'inv-currency-invoice-dialog',
    templateUrl: './currency-invoice-dialog.component.html'
})
export class CurrencyInvoiceDialogComponent implements OnInit {

    currency: CurrencyInvoice;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private currencyService: CurrencyInvoiceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.currency.id !== undefined) {
            this.subscribeToSaveResponse(
                this.currencyService.update(this.currency));
        } else {
            this.subscribeToSaveResponse(
                this.currencyService.create(this.currency));
        }
    }

    private subscribeToSaveResponse(result: Observable<CurrencyInvoice>) {
        result.subscribe((res: CurrencyInvoice) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CurrencyInvoice) {
        this.eventManager.broadcast({ name: 'currencyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'inv-currency-invoice-popup',
    template: ''
})
export class CurrencyInvoicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private currencyPopupService: CurrencyInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.currencyPopupService
                    .open(CurrencyInvoiceDialogComponent as Component, params['id']);
            } else {
                this.currencyPopupService
                    .open(CurrencyInvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
