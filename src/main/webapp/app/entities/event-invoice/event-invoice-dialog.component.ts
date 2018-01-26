import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EventInvoice } from './event-invoice.model';
import { EventInvoicePopupService } from './event-invoice-popup.service';
import { EventInvoiceService } from './event-invoice.service';
import { TenantInvoice, TenantInvoiceService } from '../tenant-invoice';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'inv-event-invoice-dialog',
    templateUrl: './event-invoice-dialog.component.html'
})
export class EventInvoiceDialogComponent implements OnInit {

    event: EventInvoice;
    isSaving: boolean;

    tenants: TenantInvoice[];
    startsOnDp: any;
    endsOnDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private eventService: EventInvoiceService,
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
        if (this.event.id !== undefined) {
            this.subscribeToSaveResponse(
                this.eventService.update(this.event));
        } else {
            this.subscribeToSaveResponse(
                this.eventService.create(this.event));
        }
    }

    private subscribeToSaveResponse(result: Observable<EventInvoice>) {
        result.subscribe((res: EventInvoice) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EventInvoice) {
        this.eventManager.broadcast({ name: 'eventListModification', content: 'OK'});
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
    selector: 'inv-event-invoice-popup',
    template: ''
})
export class EventInvoicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventPopupService: EventInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.eventPopupService
                    .open(EventInvoiceDialogComponent as Component, params['id']);
            } else {
                this.eventPopupService
                    .open(EventInvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
