/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InvoiceappTestModule } from '../../../test.module';
import { InvoiceStateInvoiceComponent } from '../../../../../../main/webapp/app/entities/invoice-state-invoice/invoice-state-invoice.component';
import { InvoiceStateInvoiceService } from '../../../../../../main/webapp/app/entities/invoice-state-invoice/invoice-state-invoice.service';
import { InvoiceStateInvoice } from '../../../../../../main/webapp/app/entities/invoice-state-invoice/invoice-state-invoice.model';

describe('Component Tests', () => {

    describe('InvoiceStateInvoice Management Component', () => {
        let comp: InvoiceStateInvoiceComponent;
        let fixture: ComponentFixture<InvoiceStateInvoiceComponent>;
        let service: InvoiceStateInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [InvoiceStateInvoiceComponent],
                providers: [
                    InvoiceStateInvoiceService
                ]
            })
            .overrideTemplate(InvoiceStateInvoiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceStateInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceStateInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new InvoiceStateInvoice(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.invoiceStates[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
