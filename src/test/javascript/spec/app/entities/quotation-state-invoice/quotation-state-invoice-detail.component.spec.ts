/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InvoiceappTestModule } from '../../../test.module';
import { QuotationStateInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/quotation-state-invoice/quotation-state-invoice-detail.component';
import { QuotationStateInvoiceService } from '../../../../../../main/webapp/app/entities/quotation-state-invoice/quotation-state-invoice.service';
import { QuotationStateInvoice } from '../../../../../../main/webapp/app/entities/quotation-state-invoice/quotation-state-invoice.model';

describe('Component Tests', () => {

    describe('QuotationStateInvoice Management Detail Component', () => {
        let comp: QuotationStateInvoiceDetailComponent;
        let fixture: ComponentFixture<QuotationStateInvoiceDetailComponent>;
        let service: QuotationStateInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [QuotationStateInvoiceDetailComponent],
                providers: [
                    QuotationStateInvoiceService
                ]
            })
            .overrideTemplate(QuotationStateInvoiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuotationStateInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuotationStateInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new QuotationStateInvoice(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.quotationState).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
