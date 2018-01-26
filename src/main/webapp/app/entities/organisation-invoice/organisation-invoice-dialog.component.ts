import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrganisationInvoice } from './organisation-invoice.model';
import { OrganisationInvoicePopupService } from './organisation-invoice-popup.service';
import { OrganisationInvoiceService } from './organisation-invoice.service';
import { AddressInvoice, AddressInvoiceService } from '../address-invoice';
import { ContactInvoice, ContactInvoiceService } from '../contact-invoice';
import { TenantInvoice, TenantInvoiceService } from '../tenant-invoice';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'inv-organisation-invoice-dialog',
    templateUrl: './organisation-invoice-dialog.component.html'
})
export class OrganisationInvoiceDialogComponent implements OnInit {

    organisation: OrganisationInvoice;
    isSaving: boolean;

    addresses: AddressInvoice[];

    contacts: ContactInvoice[];

    tenants: TenantInvoice[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private organisationService: OrganisationInvoiceService,
        private addressService: AddressInvoiceService,
        private contactService: ContactInvoiceService,
        private tenantService: TenantInvoiceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.addressService
            .query({filter: 'organisation-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.organisation.addressId) {
                    this.addresses = res.json;
                } else {
                    this.addressService
                        .find(this.organisation.addressId)
                        .subscribe((subRes: AddressInvoice) => {
                            this.addresses = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.contactService
            .query({filter: 'organisation-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.organisation.contactId) {
                    this.contacts = res.json;
                } else {
                    this.contactService
                        .find(this.organisation.contactId)
                        .subscribe((subRes: ContactInvoice) => {
                            this.contacts = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.tenantService.query()
            .subscribe((res: ResponseWrapper) => { this.tenants = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.organisation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.organisationService.update(this.organisation));
        } else {
            this.subscribeToSaveResponse(
                this.organisationService.create(this.organisation));
        }
    }

    private subscribeToSaveResponse(result: Observable<OrganisationInvoice>) {
        result.subscribe((res: OrganisationInvoice) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: OrganisationInvoice) {
        this.eventManager.broadcast({ name: 'organisationListModification', content: 'OK'});
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

    trackContactById(index: number, item: ContactInvoice) {
        return item.id;
    }

    trackTenantById(index: number, item: TenantInvoice) {
        return item.id;
    }
}

@Component({
    selector: 'inv-organisation-invoice-popup',
    template: ''
})
export class OrganisationInvoicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private organisationPopupService: OrganisationInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.organisationPopupService
                    .open(OrganisationInvoiceDialogComponent as Component, params['id']);
            } else {
                this.organisationPopupService
                    .open(OrganisationInvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
