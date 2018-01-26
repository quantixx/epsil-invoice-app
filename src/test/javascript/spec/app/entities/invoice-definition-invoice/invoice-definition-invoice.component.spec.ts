/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InvoiceappTestModule } from '../../../test.module';
import { InvoiceDefinitionInvoiceComponent } from '../../../../../../main/webapp/app/entities/invoice-definition-invoice/invoice-definition-invoice.component';
import { InvoiceDefinitionInvoiceService } from '../../../../../../main/webapp/app/entities/invoice-definition-invoice/invoice-definition-invoice.service';
import { InvoiceDefinitionInvoice } from '../../../../../../main/webapp/app/entities/invoice-definition-invoice/invoice-definition-invoice.model';

describe('Component Tests', () => {

    describe('InvoiceDefinitionInvoice Management Component', () => {
        let comp: InvoiceDefinitionInvoiceComponent;
        let fixture: ComponentFixture<InvoiceDefinitionInvoiceComponent>;
        let service: InvoiceDefinitionInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [InvoiceDefinitionInvoiceComponent],
                providers: [
                    InvoiceDefinitionInvoiceService
                ]
            })
            .overrideTemplate(InvoiceDefinitionInvoiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceDefinitionInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceDefinitionInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new InvoiceDefinitionInvoice(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.invoiceDefinitions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
