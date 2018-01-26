import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CountryInvoice } from './country-invoice.model';
import { CountryInvoicePopupService } from './country-invoice-popup.service';
import { CountryInvoiceService } from './country-invoice.service';

@Component({
    selector: 'inv-country-invoice-delete-dialog',
    templateUrl: './country-invoice-delete-dialog.component.html'
})
export class CountryInvoiceDeleteDialogComponent {

    country: CountryInvoice;

    constructor(
        private countryService: CountryInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.countryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'countryListModification',
                content: 'Deleted an country'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'inv-country-invoice-delete-popup',
    template: ''
})
export class CountryInvoiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private countryPopupService: CountryInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.countryPopupService
                .open(CountryInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
