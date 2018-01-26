/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { TenantInvoiceDialogComponent } from '../../../../../../main/webapp/app/entities/tenant-invoice/tenant-invoice-dialog.component';
import { TenantInvoiceService } from '../../../../../../main/webapp/app/entities/tenant-invoice/tenant-invoice.service';
import { TenantInvoice } from '../../../../../../main/webapp/app/entities/tenant-invoice/tenant-invoice.model';
import { AddressInvoiceService } from '../../../../../../main/webapp/app/entities/address-invoice';
import { BankInvoiceService } from '../../../../../../main/webapp/app/entities/bank-invoice';
import { DocumentInvoiceService } from '../../../../../../main/webapp/app/entities/document-invoice';
import { ContactInvoiceService } from '../../../../../../main/webapp/app/entities/contact-invoice';

describe('Component Tests', () => {

    describe('TenantInvoice Management Dialog Component', () => {
        let comp: TenantInvoiceDialogComponent;
        let fixture: ComponentFixture<TenantInvoiceDialogComponent>;
        let service: TenantInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [TenantInvoiceDialogComponent],
                providers: [
                    AddressInvoiceService,
                    BankInvoiceService,
                    DocumentInvoiceService,
                    ContactInvoiceService,
                    TenantInvoiceService
                ]
            })
            .overrideTemplate(TenantInvoiceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TenantInvoiceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TenantInvoiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TenantInvoice(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tenant = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tenantListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TenantInvoice();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tenant = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tenantListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
