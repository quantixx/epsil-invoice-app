/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { FamilyInvoiceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/family-invoice/family-invoice-delete-dialog.component';
import { FamilyInvoiceService } from '../../../../../../main/webapp/app/entities/family-invoice/family-invoice.service';

describe('Component Tests', () => {

    describe('FamilyInvoice Management Delete Component', () => {
        let comp: FamilyInvoiceDeleteDialogComponent;
        let fixture: ComponentFixture<FamilyInvoiceDeleteDialogComponent>;
        let service: FamilyInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [FamilyInvoiceDeleteDialogComponent],
                providers: [
                    FamilyInvoiceService
                ]
            })
            .overrideTemplate(FamilyInvoiceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FamilyInvoiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FamilyInvoiceService);
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
