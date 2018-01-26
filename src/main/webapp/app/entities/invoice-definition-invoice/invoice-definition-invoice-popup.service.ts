import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceDefinitionInvoice } from './invoice-definition-invoice.model';
import { InvoiceDefinitionInvoiceService } from './invoice-definition-invoice.service';

@Injectable()
export class InvoiceDefinitionInvoicePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private invoiceDefinitionService: InvoiceDefinitionInvoiceService

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
                this.invoiceDefinitionService.find(id).subscribe((invoiceDefinition) => {
                    this.ngbModalRef = this.invoiceDefinitionModalRef(component, invoiceDefinition);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.invoiceDefinitionModalRef(component, new InvoiceDefinitionInvoice());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    invoiceDefinitionModalRef(component: Component, invoiceDefinition: InvoiceDefinitionInvoice): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.invoiceDefinition = invoiceDefinition;
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
