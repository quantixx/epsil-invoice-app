import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AddressInvoice } from './address-invoice.model';
import { AddressInvoicePopupService } from './address-invoice-popup.service';
import { AddressInvoiceService } from './address-invoice.service';

@Component({
    selector: 'inv-address-invoice-delete-dialog',
    templateUrl: './address-invoice-delete-dialog.component.html'
})
export class AddressInvoiceDeleteDialogComponent {

    address: AddressInvoice;

    constructor(
        private addressService: AddressInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.addressService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'addressListModification',
                content: 'Deleted an address'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'inv-address-invoice-delete-popup',
    template: ''
})
export class AddressInvoiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private addressPopupService: AddressInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.addressPopupService
                .open(AddressInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
