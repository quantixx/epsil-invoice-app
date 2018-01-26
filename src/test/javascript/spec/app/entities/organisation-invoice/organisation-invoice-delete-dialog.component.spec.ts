/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { OrganisationInvoiceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/organisation-invoice/organisation-invoice-delete-dialog.component';
import { OrganisationInvoiceService } from '../../../../../../main/webapp/app/entities/organisation-invoice/organisation-invoice.service';

describe('Component Tests', () => {

    describe('OrganisationInvoice Management Delete Component', () => {
        let comp: OrganisationInvoiceDeleteDialogComponent;
        let fixture: ComponentFixture<OrganisationInvoiceDeleteDialogComponent>;
        let service: OrganisationInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [OrganisationInvoiceDeleteDialogComponent],
                providers: [
                    OrganisationInvoiceService
                ]
            })
            .overrideTemplate(OrganisationInvoiceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrganisationInvoiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganisationInvoiceService);
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
