/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InvoiceappTestModule } from '../../../test.module';
import { InvoiceLineInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/invoice-line-invoice/invoice-line-invoice-detail.component';
import { InvoiceLineInvoiceService } from '../../../../../../main/webapp/app/entities/invoice-line-invoice/invoice-line-invoice.service';
import { InvoiceLineInvoice } from '../../../../../../main/webapp/app/entities/invoice-line-invoice/invoice-line-invoice.model';

describe('Component Tests', () => {

    describe('InvoiceLineInvoice Management Detail Component', () => {
        let comp: InvoiceLineInvoiceDetailComponent;
        let fixture: ComponentFixture<InvoiceLineInvoiceDetailComponent>;
        let service: InvoiceLineInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [InvoiceLineInvoiceDetailComponent],
                providers: [
                    InvoiceLineInvoiceService
                ]
            })
            .overrideTemplate(InvoiceLineInvoiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceLineInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceLineInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new InvoiceLineInvoice(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.invoiceLine).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
