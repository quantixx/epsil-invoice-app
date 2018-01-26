/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InvoiceappTestModule } from '../../../test.module';
import { ContactInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/contact-invoice/contact-invoice-detail.component';
import { ContactInvoiceService } from '../../../../../../main/webapp/app/entities/contact-invoice/contact-invoice.service';
import { ContactInvoice } from '../../../../../../main/webapp/app/entities/contact-invoice/contact-invoice.model';

describe('Component Tests', () => {

    describe('ContactInvoice Management Detail Component', () => {
        let comp: ContactInvoiceDetailComponent;
        let fixture: ComponentFixture<ContactInvoiceDetailComponent>;
        let service: ContactInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [ContactInvoiceDetailComponent],
                providers: [
                    ContactInvoiceService
                ]
            })
            .overrideTemplate(ContactInvoiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContactInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ContactInvoice(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.contact).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
