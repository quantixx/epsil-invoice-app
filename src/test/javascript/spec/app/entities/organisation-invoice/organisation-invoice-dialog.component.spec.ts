/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { OrganisationInvoiceDialogComponent } from '../../../../../../main/webapp/app/entities/organisation-invoice/organisation-invoice-dialog.component';
import { OrganisationInvoiceService } from '../../../../../../main/webapp/app/entities/organisation-invoice/organisation-invoice.service';
import { OrganisationInvoice } from '../../../../../../main/webapp/app/entities/organisation-invoice/organisation-invoice.model';
import { AddressInvoiceService } from '../../../../../../main/webapp/app/entities/address-invoice';
import { ContactInvoiceService } from '../../../../../../main/webapp/app/entities/contact-invoice';
import { TenantInvoiceService } from '../../../../../../main/webapp/app/entities/tenant-invoice';

describe('Component Tests', () => {

    describe('OrganisationInvoice Management Dialog Component', () => {
        let comp: OrganisationInvoiceDialogComponent;
        let fixture: ComponentFixture<OrganisationInvoiceDialogComponent>;
        let service: OrganisationInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [OrganisationInvoiceDialogComponent],
                providers: [
                    AddressInvoiceService,
                    ContactInvoiceService,
                    TenantInvoiceService,
                    OrganisationInvoiceService
                ]
            })
            .overrideTemplate(OrganisationInvoiceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrganisationInvoiceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganisationInvoiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OrganisationInvoice(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.organisation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'organisationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OrganisationInvoice();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.organisation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'organisationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
