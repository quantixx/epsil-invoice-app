import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { QuotationStateInvoice } from './quotation-state-invoice.model';
import { QuotationStateInvoicePopupService } from './quotation-state-invoice-popup.service';
import { QuotationStateInvoiceService } from './quotation-state-invoice.service';

@Component({
    selector: 'inv-quotation-state-invoice-dialog',
    templateUrl: './quotation-state-invoice-dialog.component.html'
})
export class QuotationStateInvoiceDialogComponent implements OnInit {

    quotationState: QuotationStateInvoice;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private quotationStateService: QuotationStateInvoiceService,
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
        if (this.quotationState.id !== undefined) {
            this.subscribeToSaveResponse(
                this.quotationStateService.update(this.quotationState));
        } else {
            this.subscribeToSaveResponse(
                this.quotationStateService.create(this.quotationState));
        }
    }

    private subscribeToSaveResponse(result: Observable<QuotationStateInvoice>) {
        result.subscribe((res: QuotationStateInvoice) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: QuotationStateInvoice) {
        this.eventManager.broadcast({ name: 'quotationStateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'inv-quotation-state-invoice-popup',
    template: ''
})
export class QuotationStateInvoicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private quotationStatePopupService: QuotationStateInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.quotationStatePopupService
                    .open(QuotationStateInvoiceDialogComponent as Component, params['id']);
            } else {
                this.quotationStatePopupService
                    .open(QuotationStateInvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
