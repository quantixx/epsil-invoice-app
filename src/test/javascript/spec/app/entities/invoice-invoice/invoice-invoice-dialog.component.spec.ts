/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { InvoiceInvoiceDialogComponent } from '../../../../../../main/webapp/app/entities/invoice-invoice/invoice-invoice-dialog.component';
import { InvoiceInvoiceService } from '../../../../../../main/webapp/app/entities/invoice-invoice/invoice-invoice.service';
import { InvoiceInvoice } from '../../../../../../main/webapp/app/entities/invoice-invoice/invoice-invoice.model';
import { OrganisationInvoiceService } from '../../../../../../main/webapp/app/entities/organisation-invoice';
import { QuotationInvoiceService } from '../../../../../../main/webapp/app/entities/quotation-invoice';
import { DocumentInvoiceService } from '../../../../../../main/webapp/app/entities/document-invoice';
import { LanguageInvoiceService } from '../../../../../../main/webapp/app/entities/language-invoice';
import { CurrencyInvoiceService } from '../../../../../../main/webapp/app/entities/currency-invoice';
import { FamilyInvoiceService } from '../../../../../../main/webapp/app/entities/family-invoice';
import { TenantInvoiceService } from '../../../../../../main/webapp/app/entities/tenant-invoice';

describe('Component Tests', () => {

    describe('InvoiceInvoice Management Dialog Component', () => {
        let comp: InvoiceInvoiceDialogComponent;
        let fixture: ComponentFixture<InvoiceInvoiceDialogComponent>;
        let service: InvoiceInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [InvoiceInvoiceDialogComponent],
                providers: [
                    OrganisationInvoiceService,
                    QuotationInvoiceService,
                    DocumentInvoiceService,
                    LanguageInvoiceService,
                    CurrencyInvoiceService,
                    FamilyInvoiceService,
                    TenantInvoiceService,
                    InvoiceInvoiceService
                ]
            })
            .overrideTemplate(InvoiceInvoiceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceInvoiceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceInvoiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new InvoiceInvoice(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.invoice = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'invoiceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new InvoiceInvoice();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.invoice = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'invoiceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
