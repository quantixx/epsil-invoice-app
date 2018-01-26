import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { InvoiceStateInvoice } from './invoice-state-invoice.model';
import { InvoiceStateInvoiceService } from './invoice-state-invoice.service';

@Injectable()
export class InvoiceStateInvoicePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private invoiceStateService: InvoiceStateInvoiceService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.invoiceStateService.find(id).subscribe((invoiceState) => {
                    invoiceState.statusDate = this.datePipe
                        .transform(invoiceState.statusDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.invoiceStateModalRef(component, invoiceState);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.invoiceStateModalRef(component, new InvoiceStateInvoice());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    invoiceStateModalRef(component: Component, invoiceState: InvoiceStateInvoice): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.invoiceState = invoiceState;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
