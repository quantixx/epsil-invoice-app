import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { QuotationDefinitionInvoiceComponent } from './quotation-definition-invoice.component';
import { QuotationDefinitionInvoiceDetailComponent } from './quotation-definition-invoice-detail.component';
import { QuotationDefinitionInvoicePopupComponent } from './quotation-definition-invoice-dialog.component';
import { QuotationDefinitionInvoiceDeletePopupComponent } from './quotation-definition-invoice-delete-dialog.component';

@Injectable()
export class QuotationDefinitionInvoiceResolvePagingParams implements Resolve<any> {

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

export const quotationDefinitionRoute: Routes = [
    {
        path: 'quotation-definition-invoice',
        component: QuotationDefinitionInvoiceComponent,
        resolve: {
            'pagingParams': QuotationDefinitionInvoiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.quotationDefinition.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'quotation-definition-invoice/:id',
        component: QuotationDefinitionInvoiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.quotationDefinition.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const quotationDefinitionPopupRoute: Routes = [
    {
        path: 'quotation-definition-invoice-new',
        component: QuotationDefinitionInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.quotationDefinition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'quotation-definition-invoice/:id/edit',
        component: QuotationDefinitionInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.quotationDefinition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'quotation-definition-invoice/:id/delete',
        component: QuotationDefinitionInvoiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.quotationDefinition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
