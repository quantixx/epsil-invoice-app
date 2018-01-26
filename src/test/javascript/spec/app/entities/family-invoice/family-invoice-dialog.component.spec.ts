/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { FamilyInvoiceDialogComponent } from '../../../../../../main/webapp/app/entities/family-invoice/family-invoice-dialog.component';
import { FamilyInvoiceService } from '../../../../../../main/webapp/app/entities/family-invoice/family-invoice.service';
import { FamilyInvoice } from '../../../../../../main/webapp/app/entities/family-invoice/family-invoice.model';
import { TenantInvoiceService } from '../../../../../../main/webapp/app/entities/tenant-invoice';

describe('Component Tests', () => {

    describe('FamilyInvoice Management Dialog Component', () => {
        let comp: FamilyInvoiceDialogComponent;
        let fixture: ComponentFixture<FamilyInvoiceDialogComponent>;
        let service: FamilyInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [FamilyInvoiceDialogComponent],
                providers: [
                    TenantInvoiceService,
                    FamilyInvoiceService
                ]
            })
            .overrideTemplate(FamilyInvoiceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FamilyInvoiceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FamilyInvoiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FamilyInvoice(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.family = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'familyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FamilyInvoice();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.family = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'familyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
