/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { QuotationInvoiceDialogComponent } from '../../../../../../main/webapp/app/entities/quotation-invoice/quotation-invoice-dialog.component';
import { QuotationInvoiceService } from '../../../../../../main/webapp/app/entities/quotation-invoice/quotation-invoice.service';
import { QuotationInvoice } from '../../../../../../main/webapp/app/entities/quotation-invoice/quotation-invoice.model';
import { FamilyInvoiceService } from '../../../../../../main/webapp/app/entities/family-invoice';
import { InvoiceInvoiceService } from '../../../../../../main/webapp/app/entities/invoice-invoice';
import { TenantInvoiceService } from '../../../../../../main/webapp/app/entities/tenant-invoice';

describe('Component Tests', () => {

    describe('QuotationInvoice Management Dialog Component', () => {
        let comp: QuotationInvoiceDialogComponent;
        let fixture: ComponentFixture<QuotationInvoiceDialogComponent>;
        let service: QuotationInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [QuotationInvoiceDialogComponent],
                providers: [
                    FamilyInvoiceService,
                    InvoiceInvoiceService,
                    TenantInvoiceService,
                    QuotationInvoiceService
                ]
            })
            .overrideTemplate(QuotationInvoiceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuotationInvoiceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuotationInvoiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new QuotationInvoice(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.quotation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'quotationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new QuotationInvoice();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.quotation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'quotationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
