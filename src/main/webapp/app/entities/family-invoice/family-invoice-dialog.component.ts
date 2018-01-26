import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FamilyInvoice } from './family-invoice.model';
import { FamilyInvoicePopupService } from './family-invoice-popup.service';
import { FamilyInvoiceService } from './family-invoice.service';
import { TenantInvoice, TenantInvoiceService } from '../tenant-invoice';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'inv-family-invoice-dialog',
    templateUrl: './family-invoice-dialog.component.html'
})
export class FamilyInvoiceDialogComponent implements OnInit {

    family: FamilyInvoice;
    isSaving: boolean;

    tenants: TenantInvoice[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private familyService: FamilyInvoiceService,
        private tenantService: TenantInvoiceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tenantService.query()
            .subscribe((res: ResponseWrapper) => { this.tenants = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.family.id !== undefined) {
            this.subscribeToSaveResponse(
                this.familyService.update(this.family));
        } else {
            this.subscribeToSaveResponse(
                this.familyService.create(this.family));
        }
    }

    private subscribeToSaveResponse(result: Observable<FamilyInvoice>) {
        result.subscribe((res: FamilyInvoice) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FamilyInvoice) {
        this.eventManager.broadcast({ name: 'familyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTenantById(index: number, item: TenantInvoice) {
        return item.id;
    }
}

@Component({
    selector: 'inv-family-invoice-popup',
    template: ''
})
export class FamilyInvoicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private familyPopupService: FamilyInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.familyPopupService
                    .open(FamilyInvoiceDialogComponent as Component, params['id']);
            } else {
                this.familyPopupService
                    .open(FamilyInvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
