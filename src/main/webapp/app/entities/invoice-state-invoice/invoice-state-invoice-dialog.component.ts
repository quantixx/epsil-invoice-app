import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InvoiceStateInvoice } from './invoice-state-invoice.model';
import { InvoiceStateInvoicePopupService } from './invoice-state-invoice-popup.service';
import { InvoiceStateInvoiceService } from './invoice-state-invoice.service';
import { InvoiceInvoice, InvoiceInvoiceService } from '../invoice-invoice';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'inv-invoice-state-invoice-dialog',
    templateUrl: './invoice-state-invoice-dialog.component.html'
})
export class InvoiceStateInvoiceDialogComponent implements OnInit {

    invoiceState: InvoiceStateInvoice;
    isSaving: boolean;

    invoices: InvoiceInvoice[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private invoiceStateService: InvoiceStateInvoiceService,
        private invoiceService: InvoiceInvoiceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.invoiceService.query()
            .subscribe((res: ResponseWrapper) => { this.invoices = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.invoiceState.id !== undefined) {
            this.subscribeToSaveResponse(
                this.invoiceStateService.update(this.invoiceState));
        } else {
            this.subscribeToSaveResponse(
                this.invoiceStateService.create(this.invoiceState));
        }
    }

    private subscribeToSaveResponse(result: Observable<InvoiceStateInvoice>) {
        result.subscribe((res: InvoiceStateInvoice) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: InvoiceStateInvoice) {
        this.eventManager.broadcast({ name: 'invoiceStateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackInvoiceById(index: number, item: InvoiceInvoice) {
        return item.id;
    }
}

@Component({
    selector: 'inv-invoice-state-invoice-popup',
    template: ''
})
export class InvoiceStateInvoicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoiceStatePopupService: InvoiceStateInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.invoiceStatePopupService
                    .open(InvoiceStateInvoiceDialogComponent as Component, params['id']);
            } else {
                this.invoiceStatePopupService
                    .open(InvoiceStateInvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
