import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EventInvoice } from './event-invoice.model';
import { EventInvoicePopupService } from './event-invoice-popup.service';
import { EventInvoiceService } from './event-invoice.service';

@Component({
    selector: 'inv-event-invoice-delete-dialog',
    templateUrl: './event-invoice-delete-dialog.component.html'
})
export class EventInvoiceDeleteDialogComponent {

    event: EventInvoice;

    constructor(
        private eventService: EventInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.eventService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'eventListModification',
                content: 'Deleted an event'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'inv-event-invoice-delete-popup',
    template: ''
})
export class EventInvoiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventPopupService: EventInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.eventPopupService
                .open(EventInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
