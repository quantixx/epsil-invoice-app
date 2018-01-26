/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InvoiceappTestModule } from '../../../test.module';
import { InvoiceInvoiceComponent } from '../../../../../../main/webapp/app/entities/invoice-invoice/invoice-invoice.component';
import { InvoiceInvoiceService } from '../../../../../../main/webapp/app/entities/invoice-invoice/invoice-invoice.service';
import { InvoiceInvoice } from '../../../../../../main/webapp/app/entities/invoice-invoice/invoice-invoice.model';

describe('Component Tests', () => {

    describe('InvoiceInvoice Management Component', () => {
        let comp: InvoiceInvoiceComponent;
        let fixture: ComponentFixture<InvoiceInvoiceComponent>;
        let service: InvoiceInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [InvoiceInvoiceComponent],
                providers: [
                    InvoiceInvoiceService
                ]
            })
            .overrideTemplate(InvoiceInvoiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new InvoiceInvoice(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.invoices[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
