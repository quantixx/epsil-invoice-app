/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { QuotationDefinitionInvoiceDialogComponent } from '../../../../../../main/webapp/app/entities/quotation-definition-invoice/quotation-definition-invoice-dialog.component';
import { QuotationDefinitionInvoiceService } from '../../../../../../main/webapp/app/entities/quotation-definition-invoice/quotation-definition-invoice.service';
import { QuotationDefinitionInvoice } from '../../../../../../main/webapp/app/entities/quotation-definition-invoice/quotation-definition-invoice.model';
import { FamilyInvoiceService } from '../../../../../../main/webapp/app/entities/family-invoice';
import { LanguageInvoiceService } from '../../../../../../main/webapp/app/entities/language-invoice';
import { TenantInvoiceService } from '../../../../../../main/webapp/app/entities/tenant-invoice';

describe('Component Tests', () => {

    describe('QuotationDefinitionInvoice Management Dialog Component', () => {
        let comp: QuotationDefinitionInvoiceDialogComponent;
        let fixture: ComponentFixture<QuotationDefinitionInvoiceDialogComponent>;
        let service: QuotationDefinitionInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [QuotationDefinitionInvoiceDialogComponent],
                providers: [
                    FamilyInvoiceService,
                    LanguageInvoiceService,
                    TenantInvoiceService,
                    QuotationDefinitionInvoiceService
                ]
            })
            .overrideTemplate(QuotationDefinitionInvoiceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuotationDefinitionInvoiceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuotationDefinitionInvoiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new QuotationDefinitionInvoice(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.quotationDefinition = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'quotationDefinitionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new QuotationDefinitionInvoice();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.quotationDefinition = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'quotationDefinitionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
