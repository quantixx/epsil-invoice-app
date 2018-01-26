/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InvoiceappTestModule } from '../../../test.module';
import { ContactInvoiceComponent } from '../../../../../../main/webapp/app/entities/contact-invoice/contact-invoice.component';
import { ContactInvoiceService } from '../../../../../../main/webapp/app/entities/contact-invoice/contact-invoice.service';
import { ContactInvoice } from '../../../../../../main/webapp/app/entities/contact-invoice/contact-invoice.model';

describe('Component Tests', () => {

    describe('ContactInvoice Management Component', () => {
        let comp: ContactInvoiceComponent;
        let fixture: ComponentFixture<ContactInvoiceComponent>;
        let service: ContactInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [ContactInvoiceComponent],
                providers: [
                    ContactInvoiceService
                ]
            })
            .overrideTemplate(ContactInvoiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContactInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ContactInvoice(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.contacts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
