/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InvoiceappTestModule } from '../../../test.module';
import { QuotationDefinitionInvoiceComponent } from '../../../../../../main/webapp/app/entities/quotation-definition-invoice/quotation-definition-invoice.component';
import { QuotationDefinitionInvoiceService } from '../../../../../../main/webapp/app/entities/quotation-definition-invoice/quotation-definition-invoice.service';
import { QuotationDefinitionInvoice } from '../../../../../../main/webapp/app/entities/quotation-definition-invoice/quotation-definition-invoice.model';

describe('Component Tests', () => {

    describe('QuotationDefinitionInvoice Management Component', () => {
        let comp: QuotationDefinitionInvoiceComponent;
        let fixture: ComponentFixture<QuotationDefinitionInvoiceComponent>;
        let service: QuotationDefinitionInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [QuotationDefinitionInvoiceComponent],
                providers: [
                    QuotationDefinitionInvoiceService
                ]
            })
            .overrideTemplate(QuotationDefinitionInvoiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuotationDefinitionInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuotationDefinitionInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new QuotationDefinitionInvoice(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.quotationDefinitions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
