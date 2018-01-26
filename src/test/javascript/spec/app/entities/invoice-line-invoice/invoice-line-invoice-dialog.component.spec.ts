/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { InvoiceLineInvoiceDialogComponent } from '../../../../../../main/webapp/app/entities/invoice-line-invoice/invoice-line-invoice-dialog.component';
import { InvoiceLineInvoiceService } from '../../../../../../main/webapp/app/entities/invoice-line-invoice/invoice-line-invoice.service';
import { InvoiceLineInvoice } from '../../../../../../main/webapp/app/entities/invoice-line-invoice/invoice-line-invoice.model';
import { InvoiceInvoiceService } from '../../../../../../main/webapp/app/entities/invoice-invoice';

describe('Component Tests', () => {

    describe('InvoiceLineInvoice Management Dialog Component', () => {
        let comp: InvoiceLineInvoiceDialogComponent;
        let fixture: ComponentFixture<InvoiceLineInvoiceDialogComponent>;
        let service: InvoiceLineInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [InvoiceLineInvoiceDialogComponent],
                providers: [
                    InvoiceInvoiceService,
                    InvoiceLineInvoiceService
                ]
            })
            .overrideTemplate(InvoiceLineInvoiceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceLineInvoiceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceLineInvoiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new InvoiceLineInvoice(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.invoiceLine = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'invoiceLineListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new InvoiceLineInvoice();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.invoiceLine = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'invoiceLineListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
