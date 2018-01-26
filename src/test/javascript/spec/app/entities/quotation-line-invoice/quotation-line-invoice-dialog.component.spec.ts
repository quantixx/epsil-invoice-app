/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { QuotationLineInvoiceDialogComponent } from '../../../../../../main/webapp/app/entities/quotation-line-invoice/quotation-line-invoice-dialog.component';
import { QuotationLineInvoiceService } from '../../../../../../main/webapp/app/entities/quotation-line-invoice/quotation-line-invoice.service';
import { QuotationLineInvoice } from '../../../../../../main/webapp/app/entities/quotation-line-invoice/quotation-line-invoice.model';

describe('Component Tests', () => {

    describe('QuotationLineInvoice Management Dialog Component', () => {
        let comp: QuotationLineInvoiceDialogComponent;
        let fixture: ComponentFixture<QuotationLineInvoiceDialogComponent>;
        let service: QuotationLineInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [QuotationLineInvoiceDialogComponent],
                providers: [
                    QuotationLineInvoiceService
                ]
            })
            .overrideTemplate(QuotationLineInvoiceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuotationLineInvoiceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuotationLineInvoiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new QuotationLineInvoice(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.quotationLine = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'quotationLineListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new QuotationLineInvoice();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.quotationLine = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'quotationLineListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
