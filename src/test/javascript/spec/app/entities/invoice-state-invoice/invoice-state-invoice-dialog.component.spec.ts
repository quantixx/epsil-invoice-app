/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { InvoiceStateInvoiceDialogComponent } from '../../../../../../main/webapp/app/entities/invoice-state-invoice/invoice-state-invoice-dialog.component';
import { InvoiceStateInvoiceService } from '../../../../../../main/webapp/app/entities/invoice-state-invoice/invoice-state-invoice.service';
import { InvoiceStateInvoice } from '../../../../../../main/webapp/app/entities/invoice-state-invoice/invoice-state-invoice.model';
import { InvoiceInvoiceService } from '../../../../../../main/webapp/app/entities/invoice-invoice';

describe('Component Tests', () => {

    describe('InvoiceStateInvoice Management Dialog Component', () => {
        let comp: InvoiceStateInvoiceDialogComponent;
        let fixture: ComponentFixture<InvoiceStateInvoiceDialogComponent>;
        let service: InvoiceStateInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [InvoiceStateInvoiceDialogComponent],
                providers: [
                    InvoiceInvoiceService,
                    InvoiceStateInvoiceService
                ]
            })
            .overrideTemplate(InvoiceStateInvoiceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceStateInvoiceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceStateInvoiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new InvoiceStateInvoice(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.invoiceState = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'invoiceStateListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new InvoiceStateInvoice();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.invoiceState = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'invoiceStateListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
