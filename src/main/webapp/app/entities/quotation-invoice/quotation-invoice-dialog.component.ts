import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { QuotationInvoice } from './quotation-invoice.model';
import { QuotationInvoicePopupService } from './quotation-invoice-popup.service';
import { QuotationInvoiceService } from './quotation-invoice.service';
import { FamilyInvoice, FamilyInvoiceService } from '../family-invoice';
import { InvoiceInvoice, InvoiceInvoiceService } from '../invoice-invoice';
import { TenantInvoice, TenantInvoiceService } from '../tenant-invoice';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'inv-quotation-invoice-dialog',
    templateUrl: './quotation-invoice-dialog.component.html'
})
export class QuotationInvoiceDialogComponent implements OnInit {

    quotation: QuotationInvoice;
    isSaving: boolean;

    families: FamilyInvoice[];

    invoices: InvoiceInvoice[];

    tenants: TenantInvoice[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private quotationService: QuotationInvoiceService,
        private familyService: FamilyInvoiceService,
        private invoiceService: InvoiceInvoiceService,
        private tenantService: TenantInvoiceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.familyService.query()
            .subscribe((res: ResponseWrapper) => { this.families = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.invoiceService.query()
            .subscribe((res: ResponseWrapper) => { this.invoices = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tenantService.query()
            .subscribe((res: ResponseWrapper) => { this.tenants = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.quotation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.quotationService.update(this.quotation));
        } else {
            this.subscribeToSaveResponse(
                this.quotationService.create(this.quotation));
        }
    }

    private subscribeToSaveResponse(result: Observable<QuotationInvoice>) {
        result.subscribe((res: QuotationInvoice) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: QuotationInvoice) {
        this.eventManager.broadcast({ name: 'quotationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFamilyById(index: number, item: FamilyInvoice) {
        return item.id;
    }

    trackInvoiceById(index: number, item: InvoiceInvoice) {
        return item.id;
    }

    trackTenantById(index: number, item: TenantInvoice) {
        return item.id;
    }
}

@Component({
    selector: 'inv-quotation-invoice-popup',
    template: ''
})
export class QuotationInvoicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private quotationPopupService: QuotationInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.quotationPopupService
                    .open(QuotationInvoiceDialogComponent as Component, params['id']);
            } else {
                this.quotationPopupService
                    .open(QuotationInvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
