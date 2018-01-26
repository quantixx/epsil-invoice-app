import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BankInvoice } from './bank-invoice.model';
import { BankInvoicePopupService } from './bank-invoice-popup.service';
import { BankInvoiceService } from './bank-invoice.service';
import { AddressInvoice, AddressInvoiceService } from '../address-invoice';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'inv-bank-invoice-dialog',
    templateUrl: './bank-invoice-dialog.component.html'
})
export class BankInvoiceDialogComponent implements OnInit {

    bank: BankInvoice;
    isSaving: boolean;

    addresses: AddressInvoice[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bankService: BankInvoiceService,
        private addressService: AddressInvoiceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.addressService
            .query({filter: 'bank-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.bank.addressId) {
                    this.addresses = res.json;
                } else {
                    this.addressService
                        .find(this.bank.addressId)
                        .subscribe((subRes: AddressInvoice) => {
                            this.addresses = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bank.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bankService.update(this.bank));
        } else {
            this.subscribeToSaveResponse(
                this.bankService.create(this.bank));
        }
    }

    private subscribeToSaveResponse(result: Observable<BankInvoice>) {
        result.subscribe((res: BankInvoice) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: BankInvoice) {
        this.eventManager.broadcast({ name: 'bankListModification', content: 'OK'});
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
}

@Component({
    selector: 'inv-bank-invoice-popup',
    template: ''
})
export class BankInvoicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bankPopupService: BankInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bankPopupService
                    .open(BankInvoiceDialogComponent as Component, params['id']);
            } else {
                this.bankPopupService
                    .open(BankInvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
