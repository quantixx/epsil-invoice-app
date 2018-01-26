import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CountryInvoice } from './country-invoice.model';
import { CountryInvoiceService } from './country-invoice.service';

@Component({
    selector: 'inv-country-invoice-detail',
    templateUrl: './country-invoice-detail.component.html'
})
export class CountryInvoiceDetailComponent implements OnInit, OnDestroy {

    country: CountryInvoice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private countryService: CountryInvoiceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCountries();
    }

    load(id) {
        this.countryService.find(id).subscribe((country) => {
            this.country = country;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCountries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'countryListModification',
            (response) => this.load(this.country.id)
        );
    }
}
