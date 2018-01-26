/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InvoiceappTestModule } from '../../../test.module';
import { QuotationDefinitionInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/quotation-definition-invoice/quotation-definition-invoice-detail.component';
import { QuotationDefinitionInvoiceService } from '../../../../../../main/webapp/app/entities/quotation-definition-invoice/quotation-definition-invoice.service';
import { QuotationDefinitionInvoice } from '../../../../../../main/webapp/app/entities/quotation-definition-invoice/quotation-definition-invoice.model';

describe('Component Tests', () => {

    describe('QuotationDefinitionInvoice Management Detail Component', () => {
        let comp: QuotationDefinitionInvoiceDetailComponent;
        let fixture: ComponentFixture<QuotationDefinitionInvoiceDetailComponent>;
        let service: QuotationDefinitionInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [QuotationDefinitionInvoiceDetailComponent],
                providers: [
                    QuotationDefinitionInvoiceService
                ]
            })
            .overrideTemplate(QuotationDefinitionInvoiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuotationDefinitionInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuotationDefinitionInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new QuotationDefinitionInvoice(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.quotationDefinition).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
