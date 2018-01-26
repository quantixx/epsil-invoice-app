import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EventInvoice } from './event-invoice.model';
import { EventInvoiceService } from './event-invoice.service';

@Component({
    selector: 'inv-event-invoice-detail',
    templateUrl: './event-invoice-detail.component.html'
})
export class EventInvoiceDetailComponent implements OnInit, OnDestroy {

    event: EventInvoice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private eventService: EventInvoiceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEvents();
    }

    load(id) {
        this.eventService.find(id).subscribe((event) => {
            this.event = event;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEvents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'eventListModification',
            (response) => this.load(this.event.id)
        );
    }
}
