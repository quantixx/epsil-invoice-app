import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceDefinitionInvoice } from './invoice-definition-invoice.model';
import { InvoiceDefinitionInvoiceService } from './invoice-definition-invoice.service';

@Component({
    selector: 'inv-invoice-definition-invoice-detail',
    templateUrl: './invoice-definition-invoice-detail.component.html'
})
export class InvoiceDefinitionInvoiceDetailComponent implements OnInit, OnDestroy {

    invoiceDefinition: InvoiceDefinitionInvoice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private invoiceDefinitionService: InvoiceDefinitionInvoiceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInvoiceDefinitions();
    }

    load(id) {
        this.invoiceDefinitionService.find(id).subscribe((invoiceDefinition) => {
            this.invoiceDefinition = invoiceDefinition;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInvoiceDefinitions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'invoiceDefinitionListModification',
            (response) => this.load(this.invoiceDefinition.id)
        );
    }
}
