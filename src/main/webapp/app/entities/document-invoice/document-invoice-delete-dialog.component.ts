import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DocumentInvoice } from './document-invoice.model';
import { DocumentInvoicePopupService } from './document-invoice-popup.service';
import { DocumentInvoiceService } from './document-invoice.service';

@Component({
    selector: 'inv-document-invoice-delete-dialog',
    templateUrl: './document-invoice-delete-dialog.component.html'
})
export class DocumentInvoiceDeleteDialogComponent {

    document: DocumentInvoice;

    constructor(
        private documentService: DocumentInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.documentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'documentListModification',
                content: 'Deleted an document'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'inv-document-invoice-delete-popup',
    template: ''
})
export class DocumentInvoiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentPopupService: DocumentInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.documentPopupService
                .open(DocumentInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
