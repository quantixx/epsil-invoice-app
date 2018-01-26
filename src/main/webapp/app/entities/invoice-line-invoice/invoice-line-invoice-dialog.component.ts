import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InvoiceLineInvoice } from './invoice-line-invoice.model';
import { InvoiceLineInvoicePopupService } from './invoice-line-invoice-popup.service';
import { InvoiceLineInvoiceService } from './invoice-line-invoice.service';
import { InvoiceInvoice, InvoiceInvoiceService } from '../invoice-invoice';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'inv-invoice-line-invoice-dialog',
    templateUrl: './invoice-line-invoice-dialog.component.html'
})
export class InvoiceLineInvoiceDialogComponent implements OnInit {

    invoiceLine: InvoiceLineInvoice;
    isSaving: boolean;

    invoices: InvoiceInvoice[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private invoiceLineService: InvoiceLineInvoiceService,
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
        if (this.invoiceLine.id !== undefined) {
            this.subscribeToSaveResponse(
                this.invoiceLineService.update(this.invoiceLine));
        } else {
            this.subscribeToSaveResponse(
                this.invoiceLineService.create(this.invoiceLine));
        }
    }

    private subscribeToSaveResponse(result: Observable<InvoiceLineInvoice>) {
        result.subscribe((res: InvoiceLineInvoice) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: InvoiceLineInvoice) {
        this.eventManager.broadcast({ name: 'invoiceLineListModification', content: 'OK'});
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
    selector: 'inv-invoice-line-invoice-popup',
    template: ''
})
export class InvoiceLineInvoicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoiceLinePopupService: InvoiceLineInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.invoiceLinePopupService
                    .open(InvoiceLineInvoiceDialogComponent as Component, params['id']);
            } else {
                this.invoiceLinePopupService
                    .open(InvoiceLineInvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
