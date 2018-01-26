import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventInvoice } from './event-invoice.model';
import { EventInvoiceService } from './event-invoice.service';

@Injectable()
export class EventInvoicePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private eventService: EventInvoiceService

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
                this.eventService.find(id).subscribe((event) => {
                    if (event.startsOn) {
                        event.startsOn = {
                            year: event.startsOn.getFullYear(),
                            month: event.startsOn.getMonth() + 1,
                            day: event.startsOn.getDate()
                        };
                    }
                    if (event.endsOn) {
                        event.endsOn = {
                            year: event.endsOn.getFullYear(),
                            month: event.endsOn.getMonth() + 1,
                            day: event.endsOn.getDate()
                        };
                    }
                    this.ngbModalRef = this.eventModalRef(component, event);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.eventModalRef(component, new EventInvoice());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    eventModalRef(component: Component, event: EventInvoice): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.event = event;
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