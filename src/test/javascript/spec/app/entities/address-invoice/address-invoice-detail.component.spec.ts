/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InvoiceappTestModule } from '../../../test.module';
import { AddressInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/address-invoice/address-invoice-detail.component';
import { AddressInvoiceService } from '../../../../../../main/webapp/app/entities/address-invoice/address-invoice.service';
import { AddressInvoice } from '../../../../../../main/webapp/app/entities/address-invoice/address-invoice.model';

describe('Component Tests', () => {

    describe('AddressInvoice Management Detail Component', () => {
        let comp: AddressInvoiceDetailComponent;
        let fixture: ComponentFixture<AddressInvoiceDetailComponent>;
        let service: AddressInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [AddressInvoiceDetailComponent],
                providers: [
                    AddressInvoiceService
                ]
            })
            .overrideTemplate(AddressInvoiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new AddressInvoice(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.address).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
