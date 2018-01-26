/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InvoiceappTestModule } from '../../../test.module';
import { InvoiceDefinitionInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/invoice-definition-invoice/invoice-definition-invoice-detail.component';
import { InvoiceDefinitionInvoiceService } from '../../../../../../main/webapp/app/entities/invoice-definition-invoice/invoice-definition-invoice.service';
import { InvoiceDefinitionInvoice } from '../../../../../../main/webapp/app/entities/invoice-definition-invoice/invoice-definition-invoice.model';

describe('Component Tests', () => {

    describe('InvoiceDefinitionInvoice Management Detail Component', () => {
        let comp: InvoiceDefinitionInvoiceDetailComponent;
        let fixture: ComponentFixture<InvoiceDefinitionInvoiceDetailComponent>;
        let service: InvoiceDefinitionInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [InvoiceDefinitionInvoiceDetailComponent],
                providers: [
                    InvoiceDefinitionInvoiceService
                ]
            })
            .overrideTemplate(InvoiceDefinitionInvoiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceDefinitionInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceDefinitionInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new InvoiceDefinitionInvoice(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.invoiceDefinition).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
