import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BankInvoice } from './bank-invoice.model';
import { BankInvoiceService } from './bank-invoice.service';

@Component({
    selector: 'inv-bank-invoice-detail',
    templateUrl: './bank-invoice-detail.component.html'
})
export class BankInvoiceDetailComponent implements OnInit, OnDestroy {

    bank: BankInvoice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bankService: BankInvoiceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBanks();
    }

    load(id) {
        this.bankService.find(id).subscribe((bank) => {
            this.bank = bank;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBanks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bankListModification',
            (response) => this.load(this.bank.id)
        );
    }
}
