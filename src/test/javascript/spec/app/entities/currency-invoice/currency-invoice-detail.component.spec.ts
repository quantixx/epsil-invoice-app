/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InvoiceappTestModule } from '../../../test.module';
import { CurrencyInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/currency-invoice/currency-invoice-detail.component';
import { CurrencyInvoiceService } from '../../../../../../main/webapp/app/entities/currency-invoice/currency-invoice.service';
import { CurrencyInvoice } from '../../../../../../main/webapp/app/entities/currency-invoice/currency-invoice.model';

describe('Component Tests', () => {

    describe('CurrencyInvoice Management Detail Component', () => {
        let comp: CurrencyInvoiceDetailComponent;
        let fixture: ComponentFixture<CurrencyInvoiceDetailComponent>;
        let service: CurrencyInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [CurrencyInvoiceDetailComponent],
                providers: [
                    CurrencyInvoiceService
                ]
            })
            .overrideTemplate(CurrencyInvoiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CurrencyInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CurrencyInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new CurrencyInvoice(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.currency).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
