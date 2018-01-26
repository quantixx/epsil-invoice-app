import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { QuotationLineInvoice } from './quotation-line-invoice.model';
import { QuotationLineInvoicePopupService } from './quotation-line-invoice-popup.service';
import { QuotationLineInvoiceService } from './quotation-line-invoice.service';

@Component({
    selector: 'inv-quotation-line-invoice-dialog',
    templateUrl: './quotation-line-invoice-dialog.component.html'
})
export class QuotationLineInvoiceDialogComponent implements OnInit {

    quotationLine: QuotationLineInvoice;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private quotationLineService: QuotationLineInvoiceService,
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
        if (this.quotationLine.id !== undefined) {
            this.subscribeToSaveResponse(
                this.quotationLineService.update(this.quotationLine));
        } else {
            this.subscribeToSaveResponse(
                this.quotationLineService.create(this.quotationLine));
        }
    }

    private subscribeToSaveResponse(result: Observable<QuotationLineInvoice>) {
        result.subscribe((res: QuotationLineInvoice) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: QuotationLineInvoice) {
        this.eventManager.broadcast({ name: 'quotationLineListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'inv-quotation-line-invoice-popup',
    template: ''
})
export class QuotationLineInvoicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private quotationLinePopupService: QuotationLineInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.quotationLinePopupService
                    .open(QuotationLineInvoiceDialogComponent as Component, params['id']);
            } else {
                this.quotationLinePopupService
                    .open(QuotationLineInvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
