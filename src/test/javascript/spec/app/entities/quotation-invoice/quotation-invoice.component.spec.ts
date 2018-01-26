/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InvoiceappTestModule } from '../../../test.module';
import { QuotationInvoiceComponent } from '../../../../../../main/webapp/app/entities/quotation-invoice/quotation-invoice.component';
import { QuotationInvoiceService } from '../../../../../../main/webapp/app/entities/quotation-invoice/quotation-invoice.service';
import { QuotationInvoice } from '../../../../../../main/webapp/app/entities/quotation-invoice/quotation-invoice.model';

describe('Component Tests', () => {

    describe('QuotationInvoice Management Component', () => {
        let comp: QuotationInvoiceComponent;
        let fixture: ComponentFixture<QuotationInvoiceComponent>;
        let service: QuotationInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [QuotationInvoiceComponent],
                providers: [
                    QuotationInvoiceService
                ]
            })
            .overrideTemplate(QuotationInvoiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuotationInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuotationInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new QuotationInvoice(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.quotations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
