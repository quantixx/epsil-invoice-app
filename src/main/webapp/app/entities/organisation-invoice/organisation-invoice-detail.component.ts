import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OrganisationInvoice } from './organisation-invoice.model';
import { OrganisationInvoiceService } from './organisation-invoice.service';

@Component({
    selector: 'inv-organisation-invoice-detail',
    templateUrl: './organisation-invoice-detail.component.html'
})
export class OrganisationInvoiceDetailComponent implements OnInit, OnDestroy {

    organisation: OrganisationInvoice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private organisationService: OrganisationInvoiceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrganisations();
    }

    load(id) {
        this.organisationService.find(id).subscribe((organisation) => {
            this.organisation = organisation;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrganisations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'organisationListModification',
            (response) => this.load(this.organisation.id)
        );
    }
}
