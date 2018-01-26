import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ContactInvoice } from './contact-invoice.model';
import { ContactInvoicePopupService } from './contact-invoice-popup.service';
import { ContactInvoiceService } from './contact-invoice.service';

@Component({
    selector: 'inv-contact-invoice-delete-dialog',
    templateUrl: './contact-invoice-delete-dialog.component.html'
})
export class ContactInvoiceDeleteDialogComponent {

    contact: ContactInvoice;

    constructor(
        private contactService: ContactInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.contactService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'contactListModification',
                content: 'Deleted an contact'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'inv-contact-invoice-delete-popup',
    template: ''
})
export class ContactInvoiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contactPopupService: ContactInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.contactPopupService
                .open(ContactInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
