import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TenantInvoice } from './tenant-invoice.model';
import { TenantInvoicePopupService } from './tenant-invoice-popup.service';
import { TenantInvoiceService } from './tenant-invoice.service';

@Component({
    selector: 'inv-tenant-invoice-delete-dialog',
    templateUrl: './tenant-invoice-delete-dialog.component.html'
})
export class TenantInvoiceDeleteDialogComponent {

    tenant: TenantInvoice;

    constructor(
        private tenantService: TenantInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tenantService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tenantListModification',
                content: 'Deleted an tenant'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'inv-tenant-invoice-delete-popup',
    template: ''
})
export class TenantInvoiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tenantPopupService: TenantInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tenantPopupService
                .open(TenantInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
