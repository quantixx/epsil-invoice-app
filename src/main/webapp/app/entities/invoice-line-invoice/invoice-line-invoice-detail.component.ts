import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceLineInvoice } from './invoice-line-invoice.model';
import { InvoiceLineInvoiceService } from './invoice-line-invoice.service';

@Component({
    selector: 'inv-invoice-line-invoice-detail',
    templateUrl: './invoice-line-invoice-detail.component.html'
})
export class InvoiceLineInvoiceDetailComponent implements OnInit, OnDestroy {

    invoiceLine: InvoiceLineInvoice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private invoiceLineService: InvoiceLineInvoiceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInvoiceLines();
    }

    load(id) {
        this.invoiceLineService.find(id).subscribe((invoiceLine) => {
            this.invoiceLine = invoiceLine;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInvoiceLines() {
        this.eventSubscriber = this.eventManager.subscribe(
            'invoiceLineListModification',
            (response) => this.load(this.invoiceLine.id)
        );
    }
}
