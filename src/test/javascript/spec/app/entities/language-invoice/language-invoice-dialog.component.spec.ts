/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { LanguageInvoiceDialogComponent } from '../../../../../../main/webapp/app/entities/language-invoice/language-invoice-dialog.component';
import { LanguageInvoiceService } from '../../../../../../main/webapp/app/entities/language-invoice/language-invoice.service';
import { LanguageInvoice } from '../../../../../../main/webapp/app/entities/language-invoice/language-invoice.model';

describe('Component Tests', () => {

    describe('LanguageInvoice Management Dialog Component', () => {
        let comp: LanguageInvoiceDialogComponent;
        let fixture: ComponentFixture<LanguageInvoiceDialogComponent>;
        let service: LanguageInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [LanguageInvoiceDialogComponent],
                providers: [
                    LanguageInvoiceService
                ]
            })
            .overrideTemplate(LanguageInvoiceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LanguageInvoiceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanguageInvoiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LanguageInvoice(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.language = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'languageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LanguageInvoice();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.language = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'languageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
