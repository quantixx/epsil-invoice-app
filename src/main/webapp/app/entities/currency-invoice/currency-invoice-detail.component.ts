import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CurrencyInvoice } from './currency-invoice.model';
import { CurrencyInvoiceService } from './currency-invoice.service';

@Component({
    selector: 'inv-currency-invoice-detail',
    templateUrl: './currency-invoice-detail.component.html'
})
export class CurrencyInvoiceDetailComponent implements OnInit, OnDestroy {

    currency: CurrencyInvoice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private currencyService: CurrencyInvoiceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCurrencies();
    }

    load(id) {
        this.currencyService.find(id).subscribe((currency) => {
            this.currency = currency;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCurrencies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'currencyListModification',
            (response) => this.load(this.currency.id)
        );
    }
}
