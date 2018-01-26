import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrganisationInvoice } from './organisation-invoice.model';
import { OrganisationInvoicePopupService } from './organisation-invoice-popup.service';
import { OrganisationInvoiceService } from './organisation-invoice.service';

@Component({
    selector: 'inv-organisation-invoice-delete-dialog',
    templateUrl: './organisation-invoice-delete-dialog.component.html'
})
export class OrganisationInvoiceDeleteDialogComponent {

    organisation: OrganisationInvoice;

    constructor(
        private organisationService: OrganisationInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.organisationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'organisationListModification',
                content: 'Deleted an organisation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'inv-organisation-invoice-delete-popup',
    template: ''
})
export class OrganisationInvoiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private organisationPopupService: OrganisationInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.organisationPopupService
                .open(OrganisationInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
