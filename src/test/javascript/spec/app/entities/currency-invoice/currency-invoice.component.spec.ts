/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InvoiceappTestModule } from '../../../test.module';
import { CurrencyInvoiceComponent } from '../../../../../../main/webapp/app/entities/currency-invoice/currency-invoice.component';
import { CurrencyInvoiceService } from '../../../../../../main/webapp/app/entities/currency-invoice/currency-invoice.service';
import { CurrencyInvoice } from '../../../../../../main/webapp/app/entities/currency-invoice/currency-invoice.model';

describe('Component Tests', () => {

    describe('CurrencyInvoice Management Component', () => {
        let comp: CurrencyInvoiceComponent;
        let fixture: ComponentFixture<CurrencyInvoiceComponent>;
        let service: CurrencyInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [CurrencyInvoiceComponent],
                providers: [
                    CurrencyInvoiceService
                ]
            })
            .overrideTemplate(CurrencyInvoiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CurrencyInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CurrencyInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new CurrencyInvoice(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.currencies[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
