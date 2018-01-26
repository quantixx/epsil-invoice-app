import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FamilyInvoice } from './family-invoice.model';
import { FamilyInvoicePopupService } from './family-invoice-popup.service';
import { FamilyInvoiceService } from './family-invoice.service';

@Component({
    selector: 'inv-family-invoice-delete-dialog',
    templateUrl: './family-invoice-delete-dialog.component.html'
})
export class FamilyInvoiceDeleteDialogComponent {

    family: FamilyInvoice;

    constructor(
        private familyService: FamilyInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.familyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'familyListModification',
                content: 'Deleted an family'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'inv-family-invoice-delete-popup',
    template: ''
})
export class FamilyInvoiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private familyPopupService: FamilyInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.familyPopupService
                .open(FamilyInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
