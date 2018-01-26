/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { ContactInvoiceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/contact-invoice/contact-invoice-delete-dialog.component';
import { ContactInvoiceService } from '../../../../../../main/webapp/app/entities/contact-invoice/contact-invoice.service';

describe('Component Tests', () => {

    describe('ContactInvoice Management Delete Component', () => {
        let comp: ContactInvoiceDeleteDialogComponent;
        let fixture: ComponentFixture<ContactInvoiceDeleteDialogComponent>;
        let service: ContactInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [ContactInvoiceDeleteDialogComponent],
                providers: [
                    ContactInvoiceService
                ]
            })
            .overrideTemplate(ContactInvoiceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContactInvoiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactInvoiceService);
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
