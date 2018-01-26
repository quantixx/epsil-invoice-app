/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { CurrencyInvoiceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/currency-invoice/currency-invoice-delete-dialog.component';
import { CurrencyInvoiceService } from '../../../../../../main/webapp/app/entities/currency-invoice/currency-invoice.service';

describe('Component Tests', () => {

    describe('CurrencyInvoice Management Delete Component', () => {
        let comp: CurrencyInvoiceDeleteDialogComponent;
        let fixture: ComponentFixture<CurrencyInvoiceDeleteDialogComponent>;
        let service: CurrencyInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [CurrencyInvoiceDeleteDialogComponent],
                providers: [
                    CurrencyInvoiceService
                ]
            })
            .overrideTemplate(CurrencyInvoiceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CurrencyInvoiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CurrencyInvoiceService);
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
