import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';

import {
    InvoiceappSharedLibsModule,
    JhiLanguageHelper,
    FindLanguageFromKeyPipe,
    InvAlertComponent,
    InvAlertErrorComponent
} from './';

@NgModule({
    imports: [
        InvoiceappSharedLibsModule
    ],
    declarations: [
        FindLanguageFromKeyPipe,
        InvAlertComponent,
        InvAlertErrorComponent
    ],
    providers: [
        JhiLanguageHelper,
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
    ],
    exports: [
        InvoiceappSharedLibsModule,
        FindLanguageFromKeyPipe,
        InvAlertComponent,
        InvAlertErrorComponent
    ]
})
export class InvoiceappSharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
