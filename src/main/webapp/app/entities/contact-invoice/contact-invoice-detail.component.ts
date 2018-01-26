import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ContactInvoice } from './contact-invoice.model';
import { ContactInvoiceService } from './contact-invoice.service';

@Component({
    selector: 'inv-contact-invoice-detail',
    templateUrl: './contact-invoice-detail.component.html'
})
export class ContactInvoiceDetailComponent implements OnInit, OnDestroy {

    contact: ContactInvoice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private contactService: ContactInvoiceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInContacts();
    }

    load(id) {
        this.contactService.find(id).subscribe((contact) => {
            this.contact = contact;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInContacts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'contactListModification',
            (response) => this.load(this.contact.id)
        );
    }
}
