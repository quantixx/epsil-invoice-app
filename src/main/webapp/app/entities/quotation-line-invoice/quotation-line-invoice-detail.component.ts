import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { QuotationLineInvoice } from './quotation-line-invoice.model';
import { QuotationLineInvoiceService } from './quotation-line-invoice.service';

@Component({
    selector: 'inv-quotation-line-invoice-detail',
    templateUrl: './quotation-line-invoice-detail.component.html'
})
export class QuotationLineInvoiceDetailComponent implements OnInit, OnDestroy {

    quotationLine: QuotationLineInvoice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private quotationLineService: QuotationLineInvoiceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInQuotationLines();
    }

    load(id) {
        this.quotationLineService.find(id).subscribe((quotationLine) => {
            this.quotationLine = quotationLine;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInQuotationLines() {
        this.eventSubscriber = this.eventManager.subscribe(
            'quotationLineListModification',
            (response) => this.load(this.quotationLine.id)
        );
    }
}
