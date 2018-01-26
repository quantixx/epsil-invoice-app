/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { BankInvoiceDialogComponent } from '../../../../../../main/webapp/app/entities/bank-invoice/bank-invoice-dialog.component';
import { BankInvoiceService } from '../../../../../../main/webapp/app/entities/bank-invoice/bank-invoice.service';
import { BankInvoice } from '../../../../../../main/webapp/app/entities/bank-invoice/bank-invoice.model';
import { AddressInvoiceService } from '../../../../../../main/webapp/app/entities/address-invoice';

describe('Component Tests', () => {

    describe('BankInvoice Management Dialog Component', () => {
        let comp: BankInvoiceDialogComponent;
        let fixture: ComponentFixture<BankInvoiceDialogComponent>;
        let service: BankInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [BankInvoiceDialogComponent],
                providers: [
                    AddressInvoiceService,
                    BankInvoiceService
                ]
            })
            .overrideTemplate(BankInvoiceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BankInvoiceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankInvoiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BankInvoice(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.bank = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bankListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BankInvoice();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.bank = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bankListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
