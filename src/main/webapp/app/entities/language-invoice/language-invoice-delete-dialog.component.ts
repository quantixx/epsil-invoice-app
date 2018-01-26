import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LanguageInvoice } from './language-invoice.model';
import { LanguageInvoicePopupService } from './language-invoice-popup.service';
import { LanguageInvoiceService } from './language-invoice.service';

@Component({
    selector: 'inv-language-invoice-delete-dialog',
    templateUrl: './language-invoice-delete-dialog.component.html'
})
export class LanguageInvoiceDeleteDialogComponent {

    language: LanguageInvoice;

    constructor(
        private languageService: LanguageInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.languageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'languageListModification',
                content: 'Deleted an language'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'inv-language-invoice-delete-popup',
    template: ''
})
export class LanguageInvoiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private languagePopupService: LanguageInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.languagePopupService
                .open(LanguageInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
