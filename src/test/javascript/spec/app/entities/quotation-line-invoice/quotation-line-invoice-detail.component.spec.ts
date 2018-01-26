/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InvoiceappTestModule } from '../../../test.module';
import { QuotationLineInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/quotation-line-invoice/quotation-line-invoice-detail.component';
import { QuotationLineInvoiceService } from '../../../../../../main/webapp/app/entities/quotation-line-invoice/quotation-line-invoice.service';
import { QuotationLineInvoice } from '../../../../../../main/webapp/app/entities/quotation-line-invoice/quotation-line-invoice.model';

describe('Component Tests', () => {

    describe('QuotationLineInvoice Management Detail Component', () => {
        let comp: QuotationLineInvoiceDetailComponent;
        let fixture: ComponentFixture<QuotationLineInvoiceDetailComponent>;
        let service: QuotationLineInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [QuotationLineInvoiceDetailComponent],
                providers: [
                    QuotationLineInvoiceService
                ]
            })
            .overrideTemplate(QuotationLineInvoiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuotationLineInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuotationLineInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new QuotationLineInvoice(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.quotationLine).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
