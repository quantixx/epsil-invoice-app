import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SequenceInvoice } from './sequence-invoice.model';
import { SequenceInvoicePopupService } from './sequence-invoice-popup.service';
import { SequenceInvoiceService } from './sequence-invoice.service';
import { TenantInvoice, TenantInvoiceService } from '../tenant-invoice';
import { FamilyInvoice, FamilyInvoiceService } from '../family-invoice';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'inv-sequence-invoice-dialog',
    templateUrl: './sequence-invoice-dialog.component.html'
})
export class SequenceInvoiceDialogComponent implements OnInit {

    sequence: SequenceInvoice;
    isSaving: boolean;

    tenants: TenantInvoice[];

    families: FamilyInvoice[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sequenceService: SequenceInvoiceService,
        private tenantService: TenantInvoiceService,
        private familyService: FamilyInvoiceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tenantService.query()
            .subscribe((res: ResponseWrapper) => { this.tenants = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.familyService.query()
            .subscribe((res: ResponseWrapper) => { this.families = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sequence.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sequenceService.update(this.sequence));
        } else {
            this.subscribeToSaveResponse(
                this.sequenceService.create(this.sequence));
        }
    }

    private subscribeToSaveResponse(result: Observable<SequenceInvoice>) {
        result.subscribe((res: SequenceInvoice) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SequenceInvoice) {
        this.eventManager.broadcast({ name: 'sequenceListModification', content: 'OK'});
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

    trackFamilyById(index: number, item: FamilyInvoice) {
        return item.id;
    }
}

@Component({
    selector: 'inv-sequence-invoice-popup',
    template: ''
})
export class SequenceInvoicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sequencePopupService: SequenceInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sequencePopupService
                    .open(SequenceInvoiceDialogComponent as Component, params['id']);
            } else {
                this.sequencePopupService
                    .open(SequenceInvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
