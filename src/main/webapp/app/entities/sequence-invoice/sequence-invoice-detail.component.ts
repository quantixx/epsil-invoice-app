import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SequenceInvoice } from './sequence-invoice.model';
import { SequenceInvoiceService } from './sequence-invoice.service';

@Component({
    selector: 'inv-sequence-invoice-detail',
    templateUrl: './sequence-invoice-detail.component.html'
})
export class SequenceInvoiceDetailComponent implements OnInit, OnDestroy {

    sequence: SequenceInvoice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sequenceService: SequenceInvoiceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSequences();
    }

    load(id) {
        this.sequenceService.find(id).subscribe((sequence) => {
            this.sequence = sequence;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSequences() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sequenceListModification',
            (response) => this.load(this.sequence.id)
        );
    }
}
