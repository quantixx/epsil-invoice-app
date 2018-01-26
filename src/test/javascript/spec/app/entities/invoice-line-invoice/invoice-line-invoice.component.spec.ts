/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InvoiceappTestModule } from '../../../test.module';
import { InvoiceLineInvoiceComponent } from '../../../../../../main/webapp/app/entities/invoice-line-invoice/invoice-line-invoice.component';
import { InvoiceLineInvoiceService } from '../../../../../../main/webapp/app/entities/invoice-line-invoice/invoice-line-invoice.service';
import { InvoiceLineInvoice } from '../../../../../../main/webapp/app/entities/invoice-line-invoice/invoice-line-invoice.model';

describe('Component Tests', () => {

    describe('InvoiceLineInvoice Management Component', () => {
        let comp: InvoiceLineInvoiceComponent;
        let fixture: ComponentFixture<InvoiceLineInvoiceComponent>;
        let service: InvoiceLineInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [InvoiceLineInvoiceComponent],
                providers: [
                    InvoiceLineInvoiceService
                ]
            })
            .overrideTemplate(InvoiceLineInvoiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceLineInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceLineInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new InvoiceLineInvoice(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.invoiceLines[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
