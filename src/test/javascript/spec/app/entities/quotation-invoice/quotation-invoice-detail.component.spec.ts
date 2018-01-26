/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InvoiceappTestModule } from '../../../test.module';
import { QuotationInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/quotation-invoice/quotation-invoice-detail.component';
import { QuotationInvoiceService } from '../../../../../../main/webapp/app/entities/quotation-invoice/quotation-invoice.service';
import { QuotationInvoice } from '../../../../../../main/webapp/app/entities/quotation-invoice/quotation-invoice.model';

describe('Component Tests', () => {

    describe('QuotationInvoice Management Detail Component', () => {
        let comp: QuotationInvoiceDetailComponent;
        let fixture: ComponentFixture<QuotationInvoiceDetailComponent>;
        let service: QuotationInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [QuotationInvoiceDetailComponent],
                providers: [
                    QuotationInvoiceService
                ]
            })
            .overrideTemplate(QuotationInvoiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuotationInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuotationInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new QuotationInvoice(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.quotation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
