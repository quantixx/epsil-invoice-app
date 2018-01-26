/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { InvoiceStateInvoiceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/invoice-state-invoice/invoice-state-invoice-delete-dialog.component';
import { InvoiceStateInvoiceService } from '../../../../../../main/webapp/app/entities/invoice-state-invoice/invoice-state-invoice.service';

describe('Component Tests', () => {

    describe('InvoiceStateInvoice Management Delete Component', () => {
        let comp: InvoiceStateInvoiceDeleteDialogComponent;
        let fixture: ComponentFixture<InvoiceStateInvoiceDeleteDialogComponent>;
        let service: InvoiceStateInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [InvoiceStateInvoiceDeleteDialogComponent],
                providers: [
                    InvoiceStateInvoiceService
                ]
            })
            .overrideTemplate(InvoiceStateInvoiceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceStateInvoiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceStateInvoiceService);
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
