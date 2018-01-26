/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { SequenceInvoiceDialogComponent } from '../../../../../../main/webapp/app/entities/sequence-invoice/sequence-invoice-dialog.component';
import { SequenceInvoiceService } from '../../../../../../main/webapp/app/entities/sequence-invoice/sequence-invoice.service';
import { SequenceInvoice } from '../../../../../../main/webapp/app/entities/sequence-invoice/sequence-invoice.model';
import { TenantInvoiceService } from '../../../../../../main/webapp/app/entities/tenant-invoice';
import { FamilyInvoiceService } from '../../../../../../main/webapp/app/entities/family-invoice';

describe('Component Tests', () => {

    describe('SequenceInvoice Management Dialog Component', () => {
        let comp: SequenceInvoiceDialogComponent;
        let fixture: ComponentFixture<SequenceInvoiceDialogComponent>;
        let service: SequenceInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [SequenceInvoiceDialogComponent],
                providers: [
                    TenantInvoiceService,
                    FamilyInvoiceService,
                    SequenceInvoiceService
                ]
            })
            .overrideTemplate(SequenceInvoiceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SequenceInvoiceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SequenceInvoiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SequenceInvoice(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.sequence = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'sequenceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SequenceInvoice();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.sequence = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'sequenceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
