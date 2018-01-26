/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { QuotationDefinitionInvoiceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/quotation-definition-invoice/quotation-definition-invoice-delete-dialog.component';
import { QuotationDefinitionInvoiceService } from '../../../../../../main/webapp/app/entities/quotation-definition-invoice/quotation-definition-invoice.service';

describe('Component Tests', () => {

    describe('QuotationDefinitionInvoice Management Delete Component', () => {
        let comp: QuotationDefinitionInvoiceDeleteDialogComponent;
        let fixture: ComponentFixture<QuotationDefinitionInvoiceDeleteDialogComponent>;
        let service: QuotationDefinitionInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [QuotationDefinitionInvoiceDeleteDialogComponent],
                providers: [
                    QuotationDefinitionInvoiceService
                ]
            })
            .overrideTemplate(QuotationDefinitionInvoiceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuotationDefinitionInvoiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuotationDefinitionInvoiceService);
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
