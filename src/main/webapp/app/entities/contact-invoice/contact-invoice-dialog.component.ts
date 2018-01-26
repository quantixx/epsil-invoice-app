import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ContactInvoice } from './contact-invoice.model';
import { ContactInvoicePopupService } from './contact-invoice-popup.service';
import { ContactInvoiceService } from './contact-invoice.service';

@Component({
    selector: 'inv-contact-invoice-dialog',
    templateUrl: './contact-invoice-dialog.component.html'
})
export class ContactInvoiceDialogComponent implements OnInit {

    contact: ContactInvoice;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private contactService: ContactInvoiceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.contact.id !== undefined) {
            this.subscribeToSaveResponse(
                this.contactService.update(this.contact));
        } else {
            this.subscribeToSaveResponse(
                this.contactService.create(this.contact));
        }
    }

    private subscribeToSaveResponse(result: Observable<ContactInvoice>) {
        result.subscribe((res: ContactInvoice) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ContactInvoice) {
        this.eventManager.broadcast({ name: 'contactListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'inv-contact-invoice-popup',
    template: ''
})
export class ContactInvoicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contactPopupService: ContactInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.contactPopupService
                    .open(ContactInvoiceDialogComponent as Component, params['id']);
            } else {
                this.contactPopupService
                    .open(ContactInvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
