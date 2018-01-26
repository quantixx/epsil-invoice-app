import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DocumentInvoice } from './document-invoice.model';
import { DocumentInvoicePopupService } from './document-invoice-popup.service';
import { DocumentInvoiceService } from './document-invoice.service';
import { LanguageInvoice, LanguageInvoiceService } from '../language-invoice';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'inv-document-invoice-dialog',
    templateUrl: './document-invoice-dialog.component.html'
})
export class DocumentInvoiceDialogComponent implements OnInit {

    document: DocumentInvoice;
    isSaving: boolean;

    languages: LanguageInvoice[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private documentService: DocumentInvoiceService,
        private languageService: LanguageInvoiceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.languageService.query()
            .subscribe((res: ResponseWrapper) => { this.languages = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.document.id !== undefined) {
            this.subscribeToSaveResponse(
                this.documentService.update(this.document));
        } else {
            this.subscribeToSaveResponse(
                this.documentService.create(this.document));
        }
    }

    private subscribeToSaveResponse(result: Observable<DocumentInvoice>) {
        result.subscribe((res: DocumentInvoice) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DocumentInvoice) {
        this.eventManager.broadcast({ name: 'documentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLanguageById(index: number, item: LanguageInvoice) {
        return item.id;
    }
}

@Component({
    selector: 'inv-document-invoice-popup',
    template: ''
})
export class DocumentInvoicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentPopupService: DocumentInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.documentPopupService
                    .open(DocumentInvoiceDialogComponent as Component, params['id']);
            } else {
                this.documentPopupService
                    .open(DocumentInvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
