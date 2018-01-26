/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { InvoiceDefinitionInvoiceDialogComponent } from '../../../../../../main/webapp/app/entities/invoice-definition-invoice/invoice-definition-invoice-dialog.component';
import { InvoiceDefinitionInvoiceService } from '../../../../../../main/webapp/app/entities/invoice-definition-invoice/invoice-definition-invoice.service';
import { InvoiceDefinitionInvoice } from '../../../../../../main/webapp/app/entities/invoice-definition-invoice/invoice-definition-invoice.model';
import { FamilyInvoiceService } from '../../../../../../main/webapp/app/entities/family-invoice';
import { LanguageInvoiceService } from '../../../../../../main/webapp/app/entities/language-invoice';
import { TenantInvoiceService } from '../../../../../../main/webapp/app/entities/tenant-invoice';

describe('Component Tests', () => {

    describe('InvoiceDefinitionInvoice Management Dialog Component', () => {
        let comp: InvoiceDefinitionInvoiceDialogComponent;
        let fixture: ComponentFixture<InvoiceDefinitionInvoiceDialogComponent>;
        let service: InvoiceDefinitionInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [InvoiceDefinitionInvoiceDialogComponent],
                providers: [
                    FamilyInvoiceService,
                    LanguageInvoiceService,
                    TenantInvoiceService,
                    InvoiceDefinitionInvoiceService
                ]
            })
            .overrideTemplate(InvoiceDefinitionInvoiceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceDefinitionInvoiceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceDefinitionInvoiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new InvoiceDefinitionInvoice(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.invoiceDefinition = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'invoiceDefinitionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new InvoiceDefinitionInvoice();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.invoiceDefinition = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'invoiceDefinitionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
