/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { DocumentInvoiceDialogComponent } from '../../../../../../main/webapp/app/entities/document-invoice/document-invoice-dialog.component';
import { DocumentInvoiceService } from '../../../../../../main/webapp/app/entities/document-invoice/document-invoice.service';
import { DocumentInvoice } from '../../../../../../main/webapp/app/entities/document-invoice/document-invoice.model';
import { LanguageInvoiceService } from '../../../../../../main/webapp/app/entities/language-invoice';

describe('Component Tests', () => {

    describe('DocumentInvoice Management Dialog Component', () => {
        let comp: DocumentInvoiceDialogComponent;
        let fixture: ComponentFixture<DocumentInvoiceDialogComponent>;
        let service: DocumentInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [DocumentInvoiceDialogComponent],
                providers: [
                    LanguageInvoiceService,
                    DocumentInvoiceService
                ]
            })
            .overrideTemplate(DocumentInvoiceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentInvoiceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentInvoiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DocumentInvoice(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.document = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'documentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DocumentInvoice();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.document = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'documentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
