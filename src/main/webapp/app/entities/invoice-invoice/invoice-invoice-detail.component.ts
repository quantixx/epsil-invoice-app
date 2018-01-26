import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceInvoice } from './invoice-invoice.model';
import { InvoiceInvoiceService } from './invoice-invoice.service';

@Component({
    selector: 'inv-invoice-invoice-detail',
    templateUrl: './invoice-invoice-detail.component.html'
})
export class InvoiceInvoiceDetailComponent implements OnInit, OnDestroy {

    invoice: InvoiceInvoice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private invoiceService: InvoiceInvoiceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInvoices();
    }

    load(id) {
        this.invoiceService.find(id).subscribe((invoice) => {
            this.invoice = invoice;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInvoices() {
        this.eventSubscriber = this.eventManager.subscribe(
            'invoiceListModification',
            (response) => this.load(this.invoice.id)
        );
    }
}
