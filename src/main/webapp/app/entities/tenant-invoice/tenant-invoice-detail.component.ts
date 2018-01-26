import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TenantInvoice } from './tenant-invoice.model';
import { TenantInvoiceService } from './tenant-invoice.service';

@Component({
    selector: 'inv-tenant-invoice-detail',
    templateUrl: './tenant-invoice-detail.component.html'
})
export class TenantInvoiceDetailComponent implements OnInit, OnDestroy {

    tenant: TenantInvoice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tenantService: TenantInvoiceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTenants();
    }

    load(id) {
        this.tenantService.find(id).subscribe((tenant) => {
            this.tenant = tenant;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTenants() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tenantListModification',
            (response) => this.load(this.tenant.id)
        );
    }
}
