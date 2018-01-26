/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { QuotationStateInvoiceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/quotation-state-invoice/quotation-state-invoice-delete-dialog.component';
import { QuotationStateInvoiceService } from '../../../../../../main/webapp/app/entities/quotation-state-invoice/quotation-state-invoice.service';

describe('Component Tests', () => {

    describe('QuotationStateInvoice Management Delete Component', () => {
        let comp: QuotationStateInvoiceDeleteDialogComponent;
        let fixture: ComponentFixture<QuotationStateInvoiceDeleteDialogComponent>;
        let service: QuotationStateInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [QuotationStateInvoiceDeleteDialogComponent],
                providers: [
                    QuotationStateInvoiceService
                ]
            })
            .overrideTemplate(QuotationStateInvoiceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuotationStateInvoiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuotationStateInvoiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
