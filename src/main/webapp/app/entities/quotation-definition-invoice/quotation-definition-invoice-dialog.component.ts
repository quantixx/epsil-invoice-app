import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { QuotationDefinitionInvoice } from './quotation-definition-invoice.model';
import { QuotationDefinitionInvoicePopupService } from './quotation-definition-invoice-popup.service';
import { QuotationDefinitionInvoiceService } from './quotation-definition-invoice.service';
import { FamilyInvoice, FamilyInvoiceService } from '../family-invoice';
import { LanguageInvoice, LanguageInvoiceService } from '../language-invoice';
import { TenantInvoice, TenantInvoiceService } from '../tenant-invoice';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'inv-quotation-definition-invoice-dialog',
    templateUrl: './quotation-definition-invoice-dialog.component.html'
})
export class QuotationDefinitionInvoiceDialogComponent implements OnInit {

    quotationDefinition: QuotationDefinitionInvoice;
    isSaving: boolean;

    families: FamilyInvoice[];

    languages: LanguageInvoice[];

    tenants: TenantInvoice[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private quotationDefinitionService: QuotationDefinitionInvoiceService,
        private familyService: FamilyInvoiceService,
        private languageService: LanguageInvoiceService,
        private tenantService: TenantInvoiceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.familyService.query()
            .subscribe((res: ResponseWrapper) => { this.families = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.languageService.query()
            .subscribe((res: ResponseWrapper) => { this.languages = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tenantService.query()
            .subscribe((res: ResponseWrapper) => { this.tenants = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.quotationDefinition.id !== undefined) {
            this.subscribeToSaveResponse(
                this.quotationDefinitionService.update(this.quotationDefinition));
        } else {
            this.subscribeToSaveResponse(
                this.quotationDefinitionService.create(this.quotationDefinition));
        }
    }

    private subscribeToSaveResponse(result: Observable<QuotationDefinitionInvoice>) {
        result.subscribe((res: QuotationDefinitionInvoice) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: QuotationDefinitionInvoice) {
        this.eventManager.broadcast({ name: 'quotationDefinitionListModification', content: 'OK'});
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

    trackLanguageById(index: number, item: LanguageInvoice) {
        return item.id;
    }

    trackTenantById(index: number, item: TenantInvoice) {
        return item.id;
    }
}

@Component({
    selector: 'inv-quotation-definition-invoice-popup',
    template: ''
})
export class QuotationDefinitionInvoicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private quotationDefinitionPopupService: QuotationDefinitionInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.quotationDefinitionPopupService
                    .open(QuotationDefinitionInvoiceDialogComponent as Component, params['id']);
            } else {
                this.quotationDefinitionPopupService
                    .open(QuotationDefinitionInvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
