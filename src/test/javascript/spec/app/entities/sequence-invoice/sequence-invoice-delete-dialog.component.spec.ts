/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { SequenceInvoiceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/sequence-invoice/sequence-invoice-delete-dialog.component';
import { SequenceInvoiceService } from '../../../../../../main/webapp/app/entities/sequence-invoice/sequence-invoice.service';

describe('Component Tests', () => {

    describe('SequenceInvoice Management Delete Component', () => {
        let comp: SequenceInvoiceDeleteDialogComponent;
        let fixture: ComponentFixture<SequenceInvoiceDeleteDialogComponent>;
        let service: SequenceInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [SequenceInvoiceDeleteDialogComponent],
                providers: [
                    SequenceInvoiceService
                ]
            })
            .overrideTemplate(SequenceInvoiceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SequenceInvoiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SequenceInvoiceService);
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
