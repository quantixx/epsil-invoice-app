/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InvoiceappTestModule } from '../../../test.module';
import { InvoiceInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/invoice-invoice/invoice-invoice-detail.component';
import { InvoiceInvoiceService } from '../../../../../../main/webapp/app/entities/invoice-invoice/invoice-invoice.service';
import { InvoiceInvoice } from '../../../../../../main/webapp/app/entities/invoice-invoice/invoice-invoice.model';

describe('Component Tests', () => {

    describe('InvoiceInvoice Management Detail Component', () => {
        let comp: InvoiceInvoiceDetailComponent;
        let fixture: ComponentFixture<InvoiceInvoiceDetailComponent>;
        let service: InvoiceInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [InvoiceInvoiceDetailComponent],
                providers: [
                    InvoiceInvoiceService
                ]
            })
            .overrideTemplate(InvoiceInvoiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new InvoiceInvoice(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.invoice).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
