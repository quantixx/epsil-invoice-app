/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { InvoiceDefinitionInvoiceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/invoice-definition-invoice/invoice-definition-invoice-delete-dialog.component';
import { InvoiceDefinitionInvoiceService } from '../../../../../../main/webapp/app/entities/invoice-definition-invoice/invoice-definition-invoice.service';

describe('Component Tests', () => {

    describe('InvoiceDefinitionInvoice Management Delete Component', () => {
        let comp: InvoiceDefinitionInvoiceDeleteDialogComponent;
        let fixture: ComponentFixture<InvoiceDefinitionInvoiceDeleteDialogComponent>;
        let service: InvoiceDefinitionInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [InvoiceDefinitionInvoiceDeleteDialogComponent],
                providers: [
                    InvoiceDefinitionInvoiceService
                ]
            })
            .overrideTemplate(InvoiceDefinitionInvoiceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceDefinitionInvoiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceDefinitionInvoiceService);
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
