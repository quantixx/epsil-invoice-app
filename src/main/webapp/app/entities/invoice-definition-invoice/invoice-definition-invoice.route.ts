import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { InvoiceDefinitionInvoiceComponent } from './invoice-definition-invoice.component';
import { InvoiceDefinitionInvoiceDetailComponent } from './invoice-definition-invoice-detail.component';
import { InvoiceDefinitionInvoicePopupComponent } from './invoice-definition-invoice-dialog.component';
import { InvoiceDefinitionInvoiceDeletePopupComponent } from './invoice-definition-invoice-delete-dialog.component';

@Injectable()
export class InvoiceDefinitionInvoiceResolvePagingParams implements Resolve<any> {

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

export const invoiceDefinitionRoute: Routes = [
    {
        path: 'invoice-definition-invoice',
        component: InvoiceDefinitionInvoiceComponent,
        resolve: {
            'pagingParams': InvoiceDefinitionInvoiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.invoiceDefinition.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'invoice-definition-invoice/:id',
        component: InvoiceDefinitionInvoiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.invoiceDefinition.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const invoiceDefinitionPopupRoute: Routes = [
    {
        path: 'invoice-definition-invoice-new',
        component: InvoiceDefinitionInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.invoiceDefinition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-definition-invoice/:id/edit',
        component: InvoiceDefinitionInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.invoiceDefinition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-definition-invoice/:id/delete',
        component: InvoiceDefinitionInvoiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.invoiceDefinition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
