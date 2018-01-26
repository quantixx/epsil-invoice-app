import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { QuotationStateInvoice } from './quotation-state-invoice.model';
import { QuotationStateInvoiceService } from './quotation-state-invoice.service';

@Component({
    selector: 'inv-quotation-state-invoice-detail',
    templateUrl: './quotation-state-invoice-detail.component.html'
})
export class QuotationStateInvoiceDetailComponent implements OnInit, OnDestroy {

    quotationState: QuotationStateInvoice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private quotationStateService: QuotationStateInvoiceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInQuotationStates();
    }

    load(id) {
        this.quotationStateService.find(id).subscribe((quotationState) => {
            this.quotationState = quotationState;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInQuotationStates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'quotationStateListModification',
            (response) => this.load(this.quotationState.id)
        );
    }
}
