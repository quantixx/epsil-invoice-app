import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    HomeModule,
    EpsilHttpService,
    IEpsilHttpService
} from '@epsil-front/home';

import { InvoiceappSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';

class FakeEpsilHttpService implements IEpsilHttpService {
    getSomeNumbers() {
        return Promise.resolve(
            Array.from(Array(Math.floor(Math.random() * 50))).map(Math.random)
        );
    }
}

@NgModule({
    imports: [
        HomeModule,
        InvoiceappSharedModule,
        RouterModule.forChild([HOME_ROUTE])
    ],
    declarations: [HomeComponent],
    entryComponents: [],
    providers: [{ provide: EpsilHttpService, useClass: FakeEpsilHttpService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappHomeModule {}
