import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceStateInvoice } from './invoice-state-invoice.model';
import { InvoiceStateInvoiceService } from './invoice-state-invoice.service';

@Component({
    selector: 'inv-invoice-state-invoice-detail',
    templateUrl: './invoice-state-invoice-detail.component.html'
})
export class InvoiceStateInvoiceDetailComponent implements OnInit, OnDestroy {

    invoiceState: InvoiceStateInvoice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private invoiceStateService: InvoiceStateInvoiceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInvoiceStates();
    }

    load(id) {
        this.invoiceStateService.find(id).subscribe((invoiceState) => {
            this.invoiceState = invoiceState;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInvoiceStates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'invoiceStateListModification',
            (response) => this.load(this.invoiceState.id)
        );
    }
}
