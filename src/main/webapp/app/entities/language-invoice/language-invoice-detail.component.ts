import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LanguageInvoice } from './language-invoice.model';
import { LanguageInvoiceService } from './language-invoice.service';

@Component({
    selector: 'inv-language-invoice-detail',
    templateUrl: './language-invoice-detail.component.html'
})
export class LanguageInvoiceDetailComponent implements OnInit, OnDestroy {

    language: LanguageInvoice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private languageService: LanguageInvoiceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLanguages();
    }

    load(id) {
        this.languageService.find(id).subscribe((language) => {
            this.language = language;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLanguages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'languageListModification',
            (response) => this.load(this.language.id)
        );
    }
}
