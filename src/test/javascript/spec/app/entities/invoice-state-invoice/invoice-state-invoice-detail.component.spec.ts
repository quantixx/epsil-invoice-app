/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InvoiceappTestModule } from '../../../test.module';
import { InvoiceStateInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/invoice-state-invoice/invoice-state-invoice-detail.component';
import { InvoiceStateInvoiceService } from '../../../../../../main/webapp/app/entities/invoice-state-invoice/invoice-state-invoice.service';
import { InvoiceStateInvoice } from '../../../../../../main/webapp/app/entities/invoice-state-invoice/invoice-state-invoice.model';

describe('Component Tests', () => {

    describe('InvoiceStateInvoice Management Detail Component', () => {
        let comp: InvoiceStateInvoiceDetailComponent;
        let fixture: ComponentFixture<InvoiceStateInvoiceDetailComponent>;
        let service: InvoiceStateInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [InvoiceStateInvoiceDetailComponent],
                providers: [
                    InvoiceStateInvoiceService
                ]
            })
            .overrideTemplate(InvoiceStateInvoiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceStateInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceStateInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new InvoiceStateInvoice(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.invoiceState).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
