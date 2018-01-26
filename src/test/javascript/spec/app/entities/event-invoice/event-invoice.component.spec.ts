/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InvoiceappTestModule } from '../../../test.module';
import { EventInvoiceComponent } from '../../../../../../main/webapp/app/entities/event-invoice/event-invoice.component';
import { EventInvoiceService } from '../../../../../../main/webapp/app/entities/event-invoice/event-invoice.service';
import { EventInvoice } from '../../../../../../main/webapp/app/entities/event-invoice/event-invoice.model';

describe('Component Tests', () => {

    describe('EventInvoice Management Component', () => {
        let comp: EventInvoiceComponent;
        let fixture: ComponentFixture<EventInvoiceComponent>;
        let service: EventInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [EventInvoiceComponent],
                providers: [
                    EventInvoiceService
                ]
            })
            .overrideTemplate(EventInvoiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EventInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EventInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EventInvoice(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.events[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
