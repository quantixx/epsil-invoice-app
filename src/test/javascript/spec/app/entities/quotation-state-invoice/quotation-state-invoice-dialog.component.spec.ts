/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { QuotationStateInvoiceDialogComponent } from '../../../../../../main/webapp/app/entities/quotation-state-invoice/quotation-state-invoice-dialog.component';
import { QuotationStateInvoiceService } from '../../../../../../main/webapp/app/entities/quotation-state-invoice/quotation-state-invoice.service';
import { QuotationStateInvoice } from '../../../../../../main/webapp/app/entities/quotation-state-invoice/quotation-state-invoice.model';

describe('Component Tests', () => {

    describe('QuotationStateInvoice Management Dialog Component', () => {
        let comp: QuotationStateInvoiceDialogComponent;
        let fixture: ComponentFixture<QuotationStateInvoiceDialogComponent>;
        let service: QuotationStateInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [QuotationStateInvoiceDialogComponent],
                providers: [
                    QuotationStateInvoiceService
                ]
            })
            .overrideTemplate(QuotationStateInvoiceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuotationStateInvoiceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuotationStateInvoiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new QuotationStateInvoice(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.quotationState = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'quotationStateListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new QuotationStateInvoice();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.quotationState = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'quotationStateListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
