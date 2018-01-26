import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { QuotationDefinitionInvoice } from './quotation-definition-invoice.model';
import { QuotationDefinitionInvoiceService } from './quotation-definition-invoice.service';

@Injectable()
export class QuotationDefinitionInvoicePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private quotationDefinitionService: QuotationDefinitionInvoiceService

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
                this.quotationDefinitionService.find(id).subscribe((quotationDefinition) => {
                    this.ngbModalRef = this.quotationDefinitionModalRef(component, quotationDefinition);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.quotationDefinitionModalRef(component, new QuotationDefinitionInvoice());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    quotationDefinitionModalRef(component: Component, quotationDefinition: QuotationDefinitionInvoice): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.quotationDefinition = quotationDefinition;
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
