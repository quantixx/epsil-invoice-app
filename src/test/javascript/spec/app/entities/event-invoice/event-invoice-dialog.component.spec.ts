/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { EventInvoiceDialogComponent } from '../../../../../../main/webapp/app/entities/event-invoice/event-invoice-dialog.component';
import { EventInvoiceService } from '../../../../../../main/webapp/app/entities/event-invoice/event-invoice.service';
import { EventInvoice } from '../../../../../../main/webapp/app/entities/event-invoice/event-invoice.model';
import { TenantInvoiceService } from '../../../../../../main/webapp/app/entities/tenant-invoice';

describe('Component Tests', () => {

    describe('EventInvoice Management Dialog Component', () => {
        let comp: EventInvoiceDialogComponent;
        let fixture: ComponentFixture<EventInvoiceDialogComponent>;
        let service: EventInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [EventInvoiceDialogComponent],
                providers: [
                    TenantInvoiceService,
                    EventInvoiceService
                ]
            })
            .overrideTemplate(EventInvoiceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EventInvoiceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EventInvoiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EventInvoice(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.event = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'eventListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EventInvoice();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.event = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'eventListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
