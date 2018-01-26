import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SequenceInvoice } from './sequence-invoice.model';
import { SequenceInvoicePopupService } from './sequence-invoice-popup.service';
import { SequenceInvoiceService } from './sequence-invoice.service';

@Component({
    selector: 'inv-sequence-invoice-delete-dialog',
    templateUrl: './sequence-invoice-delete-dialog.component.html'
})
export class SequenceInvoiceDeleteDialogComponent {

    sequence: SequenceInvoice;

    constructor(
        private sequenceService: SequenceInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sequenceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sequenceListModification',
                content: 'Deleted an sequence'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'inv-sequence-invoice-delete-popup',
    template: ''
})
export class SequenceInvoiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sequencePopupService: SequenceInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sequencePopupService
                .open(SequenceInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
