import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceappSharedModule } from '../shared';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

import {
    adminState,
    AuditsComponent,
    UserMgmtComponent,
    UserDialogComponent,
    UserDeleteDialogComponent,
    UserMgmtDetailComponent,
    UserMgmtDialogComponent,
    UserMgmtDeleteDialogComponent,
    LogsComponent,
    InvMetricsMonitoringModalComponent,
    InvMetricsMonitoringComponent,
    InvHealthModalComponent,
    InvHealthCheckComponent,
    InvConfigurationComponent,
    InvDocsComponent,
    AuditsService,
    InvConfigurationService,
    InvHealthService,
    InvMetricsService,
    GatewayRoutesService,
    InvGatewayComponent,
    LogsService,
    UserResolvePagingParams,
    UserResolve,
    UserModalService
} from './';

@NgModule({
    imports: [
        InvoiceappSharedModule,
        RouterModule.forChild(adminState),
        /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    ],
    declarations: [
        AuditsComponent,
        UserMgmtComponent,
        UserDialogComponent,
        UserDeleteDialogComponent,
        UserMgmtDetailComponent,
        UserMgmtDialogComponent,
        UserMgmtDeleteDialogComponent,
        LogsComponent,
        InvConfigurationComponent,
        InvHealthCheckComponent,
        InvHealthModalComponent,
        InvDocsComponent,
        InvGatewayComponent,
        InvMetricsMonitoringComponent,
        InvMetricsMonitoringModalComponent
    ],
    entryComponents: [
        UserMgmtDialogComponent,
        UserMgmtDeleteDialogComponent,
        InvHealthModalComponent,
        InvMetricsMonitoringModalComponent,
    ],
    providers: [
        AuditsService,
        InvConfigurationService,
        InvHealthService,
        InvMetricsService,
        GatewayRoutesService,
        LogsService,
        UserResolvePagingParams,
        UserResolve,
        UserModalService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappAdminModule {}
