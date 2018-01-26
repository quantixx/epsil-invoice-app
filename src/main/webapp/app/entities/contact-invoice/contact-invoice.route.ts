import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ContactInvoiceComponent } from './contact-invoice.component';
import { ContactInvoiceDetailComponent } from './contact-invoice-detail.component';
import { ContactInvoicePopupComponent } from './contact-invoice-dialog.component';
import { ContactInvoiceDeletePopupComponent } from './contact-invoice-delete-dialog.component';

@Injectable()
export class ContactInvoiceResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const contactRoute: Routes = [
    {
        path: 'contact-invoice',
        component: ContactInvoiceComponent,
        resolve: {
            'pagingParams': ContactInvoiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.contact.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'contact-invoice/:id',
        component: ContactInvoiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.contact.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contactPopupRoute: Routes = [
    {
        path: 'contact-invoice-new',
        component: ContactInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.contact.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contact-invoice/:id/edit',
        component: ContactInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.contact.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contact-invoice/:id/delete',
        component: ContactInvoiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.contact.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
