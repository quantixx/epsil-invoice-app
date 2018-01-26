import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LanguageInvoice } from './language-invoice.model';
import { LanguageInvoicePopupService } from './language-invoice-popup.service';
import { LanguageInvoiceService } from './language-invoice.service';

@Component({
    selector: 'inv-language-invoice-dialog',
    templateUrl: './language-invoice-dialog.component.html'
})
export class LanguageInvoiceDialogComponent implements OnInit {

    language: LanguageInvoice;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private languageService: LanguageInvoiceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.language.id !== undefined) {
            this.subscribeToSaveResponse(
                this.languageService.update(this.language));
        } else {
            this.subscribeToSaveResponse(
                this.languageService.create(this.language));
        }
    }

    private subscribeToSaveResponse(result: Observable<LanguageInvoice>) {
        result.subscribe((res: LanguageInvoice) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: LanguageInvoice) {
        this.eventManager.broadcast({ name: 'languageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'inv-language-invoice-popup',
    template: ''
})
export class LanguageInvoicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private languagePopupService: LanguageInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.languagePopupService
                    .open(LanguageInvoiceDialogComponent as Component, params['id']);
            } else {
                this.languagePopupService
                    .open(LanguageInvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
