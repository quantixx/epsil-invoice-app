import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TenantInvoice } from './tenant-invoice.model';
import { TenantInvoicePopupService } from './tenant-invoice-popup.service';
import { TenantInvoiceService } from './tenant-invoice.service';
import { AddressInvoice, AddressInvoiceService } from '../address-invoice';
import { BankInvoice, BankInvoiceService } from '../bank-invoice';
import { DocumentInvoice, DocumentInvoiceService } from '../document-invoice';
import { ContactInvoice, ContactInvoiceService } from '../contact-invoice';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'inv-tenant-invoice-dialog',
    templateUrl: './tenant-invoice-dialog.component.html'
})
export class TenantInvoiceDialogComponent implements OnInit {

    tenant: TenantInvoice;
    isSaving: boolean;

    invoiceaddresses: AddressInvoice[];

    banks: BankInvoice[];

    logos: DocumentInvoice[];

    contacts: ContactInvoice[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tenantService: TenantInvoiceService,
        private addressService: AddressInvoiceService,
        private bankService: BankInvoiceService,
        private documentService: DocumentInvoiceService,
        private contactService: ContactInvoiceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.addressService
            .query({filter: 'tenant-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.tenant.invoiceAddressId) {
                    this.invoiceaddresses = res.json;
                } else {
                    this.addressService
                        .find(this.tenant.invoiceAddressId)
                        .subscribe((subRes: AddressInvoice) => {
                            this.invoiceaddresses = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.bankService
            .query({filter: 'tenant-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.tenant.bankId) {
                    this.banks = res.json;
                } else {
                    this.bankService
                        .find(this.tenant.bankId)
                        .subscribe((subRes: BankInvoice) => {
                            this.banks = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.documentService
            .query({filter: 'tenant-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.tenant.logoId) {
                    this.logos = res.json;
                } else {
                    this.documentService
                        .find(this.tenant.logoId)
                        .subscribe((subRes: DocumentInvoice) => {
                            this.logos = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.contactService
            .query({filter: 'tenant-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.tenant.contactId) {
                    this.contacts = res.json;
                } else {
                    this.contactService
                        .find(this.tenant.contactId)
                        .subscribe((subRes: ContactInvoice) => {
                            this.contacts = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tenant.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tenantService.update(this.tenant));
        } else {
            this.subscribeToSaveResponse(
                this.tenantService.create(this.tenant));
        }
    }

    private subscribeToSaveResponse(result: Observable<TenantInvoice>) {
        result.subscribe((res: TenantInvoice) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TenantInvoice) {
        this.eventManager.broadcast({ name: 'tenantListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAddressById(index: number, item: AddressInvoice) {
        return item.id;
    }

    trackBankById(index: number, item: BankInvoice) {
        return item.id;
    }

    trackDocumentById(index: number, item: DocumentInvoice) {
        return item.id;
    }

    trackContactById(index: number, item: ContactInvoice) {
        return item.id;
    }
}

@Component({
    selector: 'inv-tenant-invoice-popup',
    template: ''
})
export class TenantInvoicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tenantPopupService: TenantInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tenantPopupService
                    .open(TenantInvoiceDialogComponent as Component, params['id']);
            } else {
                this.tenantPopupService
                    .open(TenantInvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
