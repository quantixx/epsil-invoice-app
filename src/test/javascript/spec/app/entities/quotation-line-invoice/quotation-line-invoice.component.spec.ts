/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InvoiceappTestModule } from '../../../test.module';
import { QuotationLineInvoiceComponent } from '../../../../../../main/webapp/app/entities/quotation-line-invoice/quotation-line-invoice.component';
import { QuotationLineInvoiceService } from '../../../../../../main/webapp/app/entities/quotation-line-invoice/quotation-line-invoice.service';
import { QuotationLineInvoice } from '../../../../../../main/webapp/app/entities/quotation-line-invoice/quotation-line-invoice.model';

describe('Component Tests', () => {

    describe('QuotationLineInvoice Management Component', () => {
        let comp: QuotationLineInvoiceComponent;
        let fixture: ComponentFixture<QuotationLineInvoiceComponent>;
        let service: QuotationLineInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [QuotationLineInvoiceComponent],
                providers: [
                    QuotationLineInvoiceService
                ]
            })
            .overrideTemplate(QuotationLineInvoiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuotationLineInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuotationLineInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new QuotationLineInvoice(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.quotationLines[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
