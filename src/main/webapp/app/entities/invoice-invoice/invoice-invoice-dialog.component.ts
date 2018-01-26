import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InvoiceInvoice } from './invoice-invoice.model';
import { InvoiceInvoicePopupService } from './invoice-invoice-popup.service';
import { InvoiceInvoiceService } from './invoice-invoice.service';
import { OrganisationInvoice, OrganisationInvoiceService } from '../organisation-invoice';
import { QuotationInvoice, QuotationInvoiceService } from '../quotation-invoice';
import { DocumentInvoice, DocumentInvoiceService } from '../document-invoice';
import { LanguageInvoice, LanguageInvoiceService } from '../language-invoice';
import { CurrencyInvoice, CurrencyInvoiceService } from '../currency-invoice';
import { FamilyInvoice, FamilyInvoiceService } from '../family-invoice';
import { TenantInvoice, TenantInvoiceService } from '../tenant-invoice';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'inv-invoice-invoice-dialog',
    templateUrl: './invoice-invoice-dialog.component.html'
})
export class InvoiceInvoiceDialogComponent implements OnInit {

    invoice: InvoiceInvoice;
    isSaving: boolean;

    linkeds: InvoiceInvoice[];

    organisations: OrganisationInvoice[];

    quotations: QuotationInvoice[];

    documents: DocumentInvoice[];

    languages: LanguageInvoice[];

    currencies: CurrencyInvoice[];

    families: FamilyInvoice[];

    tenants: TenantInvoice[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private invoiceService: InvoiceInvoiceService,
        private organisationService: OrganisationInvoiceService,
        private quotationService: QuotationInvoiceService,
        private documentService: DocumentInvoiceService,
        private languageService: LanguageInvoiceService,
        private currencyService: CurrencyInvoiceService,
        private familyService: FamilyInvoiceService,
        private tenantService: TenantInvoiceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.invoiceService
            .query({filter: 'invoice-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.invoice.linkedId) {
                    this.linkeds = res.json;
                } else {
                    this.invoiceService
                        .find(this.invoice.linkedId)
                        .subscribe((subRes: InvoiceInvoice) => {
                            this.linkeds = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.organisationService
            .query({filter: 'invoice-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.invoice.organisationId) {
                    this.organisations = res.json;
                } else {
                    this.organisationService
                        .find(this.invoice.organisationId)
                        .subscribe((subRes: OrganisationInvoice) => {
                            this.organisations = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.quotationService
            .query({filter: 'invoice-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.invoice.quotationId) {
                    this.quotations = res.json;
                } else {
                    this.quotationService
                        .find(this.invoice.quotationId)
                        .subscribe((subRes: QuotationInvoice) => {
                            this.quotations = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.documentService
            .query({filter: 'invoice-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.invoice.documentId) {
                    this.documents = res.json;
                } else {
                    this.documentService
                        .find(this.invoice.documentId)
                        .subscribe((subRes: DocumentInvoice) => {
                            this.documents = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.languageService.query()
            .subscribe((res: ResponseWrapper) => { this.languages = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.currencyService.query()
            .subscribe((res: ResponseWrapper) => { this.currencies = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.familyService.query()
            .subscribe((res: ResponseWrapper) => { this.families = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tenantService.query()
            .subscribe((res: ResponseWrapper) => { this.tenants = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.invoice.id !== undefined) {
            this.subscribeToSaveResponse(
                this.invoiceService.update(this.invoice));
        } else {
            this.subscribeToSaveResponse(
                this.invoiceService.create(this.invoice));
        }
    }

    private subscribeToSaveResponse(result: Observable<InvoiceInvoice>) {
        result.subscribe((res: InvoiceInvoice) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: InvoiceInvoice) {
        this.eventManager.broadcast({ name: 'invoiceListModification', content: 'OK'});
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

    trackOrganisationById(index: number, item: OrganisationInvoice) {
        return item.id;
    }

    trackQuotationById(index: number, item: QuotationInvoice) {
        return item.id;
    }

    trackDocumentById(index: number, item: DocumentInvoice) {
        return item.id;
    }

    trackLanguageById(index: number, item: LanguageInvoice) {
        return item.id;
    }

    trackCurrencyById(index: number, item: CurrencyInvoice) {
        return item.id;
    }

    trackFamilyById(index: number, item: FamilyInvoice) {
        return item.id;
    }

    trackTenantById(index: number, item: TenantInvoice) {
        return item.id;
    }
}

@Component({
    selector: 'inv-invoice-invoice-popup',
    template: ''
})
export class InvoiceInvoicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoicePopupService: InvoiceInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.invoicePopupService
                    .open(InvoiceInvoiceDialogComponent as Component, params['id']);
            } else {
                this.invoicePopupService
                    .open(InvoiceInvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
