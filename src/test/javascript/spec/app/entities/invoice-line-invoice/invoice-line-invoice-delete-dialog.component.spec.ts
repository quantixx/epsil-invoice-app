/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { InvoiceLineInvoiceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/invoice-line-invoice/invoice-line-invoice-delete-dialog.component';
import { InvoiceLineInvoiceService } from '../../../../../../main/webapp/app/entities/invoice-line-invoice/invoice-line-invoice.service';

describe('Component Tests', () => {

    describe('InvoiceLineInvoice Management Delete Component', () => {
        let comp: InvoiceLineInvoiceDeleteDialogComponent;
        let fixture: ComponentFixture<InvoiceLineInvoiceDeleteDialogComponent>;
        let service: InvoiceLineInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [InvoiceLineInvoiceDeleteDialogComponent],
                providers: [
                    InvoiceLineInvoiceService
                ]
            })
            .overrideTemplate(InvoiceLineInvoiceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceLineInvoiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceLineInvoiceService);
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
