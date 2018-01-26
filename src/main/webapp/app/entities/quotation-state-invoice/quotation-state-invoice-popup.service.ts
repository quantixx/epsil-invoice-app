import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { QuotationStateInvoice } from './quotation-state-invoice.model';
import { QuotationStateInvoiceService } from './quotation-state-invoice.service';

@Injectable()
export class QuotationStateInvoicePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private quotationStateService: QuotationStateInvoiceService

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
                this.quotationStateService.find(id).subscribe((quotationState) => {
                    quotationState.statusDate = this.datePipe
                        .transform(quotationState.statusDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.quotationStateModalRef(component, quotationState);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.quotationStateModalRef(component, new QuotationStateInvoice());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    quotationStateModalRef(component: Component, quotationState: QuotationStateInvoice): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.quotationState = quotationState;
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
