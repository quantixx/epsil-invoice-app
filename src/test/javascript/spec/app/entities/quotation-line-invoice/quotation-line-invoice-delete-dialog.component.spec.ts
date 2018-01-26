/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { QuotationLineInvoiceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/quotation-line-invoice/quotation-line-invoice-delete-dialog.component';
import { QuotationLineInvoiceService } from '../../../../../../main/webapp/app/entities/quotation-line-invoice/quotation-line-invoice.service';

describe('Component Tests', () => {

    describe('QuotationLineInvoice Management Delete Component', () => {
        let comp: QuotationLineInvoiceDeleteDialogComponent;
        let fixture: ComponentFixture<QuotationLineInvoiceDeleteDialogComponent>;
        let service: QuotationLineInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [QuotationLineInvoiceDeleteDialogComponent],
                providers: [
                    QuotationLineInvoiceService
                ]
            })
            .overrideTemplate(QuotationLineInvoiceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuotationLineInvoiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuotationLineInvoiceService);
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
