import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FamilyInvoice } from './family-invoice.model';
import { FamilyInvoiceService } from './family-invoice.service';

@Component({
    selector: 'inv-family-invoice-detail',
    templateUrl: './family-invoice-detail.component.html'
})
export class FamilyInvoiceDetailComponent implements OnInit, OnDestroy {

    family: FamilyInvoice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private familyService: FamilyInvoiceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFamilies();
    }

    load(id) {
        this.familyService.find(id).subscribe((family) => {
            this.family = family;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFamilies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'familyListModification',
            (response) => this.load(this.family.id)
        );
    }
}
