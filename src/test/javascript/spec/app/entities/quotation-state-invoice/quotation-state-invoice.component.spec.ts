/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InvoiceappTestModule } from '../../../test.module';
import { QuotationStateInvoiceComponent } from '../../../../../../main/webapp/app/entities/quotation-state-invoice/quotation-state-invoice.component';
import { QuotationStateInvoiceService } from '../../../../../../main/webapp/app/entities/quotation-state-invoice/quotation-state-invoice.service';
import { QuotationStateInvoice } from '../../../../../../main/webapp/app/entities/quotation-state-invoice/quotation-state-invoice.model';

describe('Component Tests', () => {

    describe('QuotationStateInvoice Management Component', () => {
        let comp: QuotationStateInvoiceComponent;
        let fixture: ComponentFixture<QuotationStateInvoiceComponent>;
        let service: QuotationStateInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [QuotationStateInvoiceComponent],
                providers: [
                    QuotationStateInvoiceService
                ]
            })
            .overrideTemplate(QuotationStateInvoiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuotationStateInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuotationStateInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new QuotationStateInvoice(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.quotationStates[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
