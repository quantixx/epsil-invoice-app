import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InvoiceDefinitionInvoice } from './invoice-definition-invoice.model';
import { InvoiceDefinitionInvoicePopupService } from './invoice-definition-invoice-popup.service';
import { InvoiceDefinitionInvoiceService } from './invoice-definition-invoice.service';
import { FamilyInvoice, FamilyInvoiceService } from '../family-invoice';
import { LanguageInvoice, LanguageInvoiceService } from '../language-invoice';
import { TenantInvoice, TenantInvoiceService } from '../tenant-invoice';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'inv-invoice-definition-invoice-dialog',
    templateUrl: './invoice-definition-invoice-dialog.component.html'
})
export class InvoiceDefinitionInvoiceDialogComponent implements OnInit {

    invoiceDefinition: InvoiceDefinitionInvoice;
    isSaving: boolean;

    families: FamilyInvoice[];

    languages: LanguageInvoice[];

    tenants: TenantInvoice[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private invoiceDefinitionService: InvoiceDefinitionInvoiceService,
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
        if (this.invoiceDefinition.id !== undefined) {
            this.subscribeToSaveResponse(
                this.invoiceDefinitionService.update(this.invoiceDefinition));
        } else {
            this.subscribeToSaveResponse(
                this.invoiceDefinitionService.create(this.invoiceDefinition));
        }
    }

    private subscribeToSaveResponse(result: Observable<InvoiceDefinitionInvoice>) {
        result.subscribe((res: InvoiceDefinitionInvoice) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: InvoiceDefinitionInvoice) {
        this.eventManager.broadcast({ name: 'invoiceDefinitionListModification', content: 'OK'});
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
    selector: 'inv-invoice-definition-invoice-popup',
    template: ''
})
export class InvoiceDefinitionInvoicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoiceDefinitionPopupService: InvoiceDefinitionInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.invoiceDefinitionPopupService
                    .open(InvoiceDefinitionInvoiceDialogComponent as Component, params['id']);
            } else {
                this.invoiceDefinitionPopupService
                    .open(InvoiceDefinitionInvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
