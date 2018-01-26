import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { QuotationInvoice } from './quotation-invoice.model';
import { QuotationInvoiceService } from './quotation-invoice.service';

@Component({
    selector: 'inv-quotation-invoice-detail',
    templateUrl: './quotation-invoice-detail.component.html'
})
export class QuotationInvoiceDetailComponent implements OnInit, OnDestroy {

    quotation: QuotationInvoice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private quotationService: QuotationInvoiceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInQuotations();
    }

    load(id) {
        this.quotationService.find(id).subscribe((quotation) => {
            this.quotation = quotation;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInQuotations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'quotationListModification',
            (response) => this.load(this.quotation.id)
        );
    }
}
