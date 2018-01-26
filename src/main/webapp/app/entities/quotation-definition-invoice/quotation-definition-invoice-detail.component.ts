import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { QuotationDefinitionInvoice } from './quotation-definition-invoice.model';
import { QuotationDefinitionInvoiceService } from './quotation-definition-invoice.service';

@Component({
    selector: 'inv-quotation-definition-invoice-detail',
    templateUrl: './quotation-definition-invoice-detail.component.html'
})
export class QuotationDefinitionInvoiceDetailComponent implements OnInit, OnDestroy {

    quotationDefinition: QuotationDefinitionInvoice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private quotationDefinitionService: QuotationDefinitionInvoiceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInQuotationDefinitions();
    }

    load(id) {
        this.quotationDefinitionService.find(id).subscribe((quotationDefinition) => {
            this.quotationDefinition = quotationDefinition;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInQuotationDefinitions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'quotationDefinitionListModification',
            (response) => this.load(this.quotationDefinition.id)
        );
    }
}
