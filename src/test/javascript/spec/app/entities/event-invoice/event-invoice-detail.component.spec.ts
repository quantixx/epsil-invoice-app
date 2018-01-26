/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InvoiceappTestModule } from '../../../test.module';
import { EventInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/event-invoice/event-invoice-detail.component';
import { EventInvoiceService } from '../../../../../../main/webapp/app/entities/event-invoice/event-invoice.service';
import { EventInvoice } from '../../../../../../main/webapp/app/entities/event-invoice/event-invoice.model';

describe('Component Tests', () => {

    describe('EventInvoice Management Detail Component', () => {
        let comp: EventInvoiceDetailComponent;
        let fixture: ComponentFixture<EventInvoiceDetailComponent>;
        let service: EventInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [EventInvoiceDetailComponent],
                providers: [
                    EventInvoiceService
                ]
            })
            .overrideTemplate(EventInvoiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EventInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EventInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EventInvoice(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.event).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
