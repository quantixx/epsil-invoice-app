/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InvoiceappTestModule } from '../../../test.module';
import { AddressInvoiceComponent } from '../../../../../../main/webapp/app/entities/address-invoice/address-invoice.component';
import { AddressInvoiceService } from '../../../../../../main/webapp/app/entities/address-invoice/address-invoice.service';
import { AddressInvoice } from '../../../../../../main/webapp/app/entities/address-invoice/address-invoice.model';

describe('Component Tests', () => {

    describe('AddressInvoice Management Component', () => {
        let comp: AddressInvoiceComponent;
        let fixture: ComponentFixture<AddressInvoiceComponent>;
        let service: AddressInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [AddressInvoiceComponent],
                providers: [
                    AddressInvoiceService
                ]
            })
            .overrideTemplate(AddressInvoiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new AddressInvoice(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.addresses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
