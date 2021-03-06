/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { BankInvoiceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/bank-invoice/bank-invoice-delete-dialog.component';
import { BankInvoiceService } from '../../../../../../main/webapp/app/entities/bank-invoice/bank-invoice.service';

describe('Component Tests', () => {

    describe('BankInvoice Management Delete Component', () => {
        let comp: BankInvoiceDeleteDialogComponent;
        let fixture: ComponentFixture<BankInvoiceDeleteDialogComponent>;
        let service: BankInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [BankInvoiceDeleteDialogComponent],
                providers: [
                    BankInvoiceService
                ]
            })
            .overrideTemplate(BankInvoiceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BankInvoiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankInvoiceService);
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
