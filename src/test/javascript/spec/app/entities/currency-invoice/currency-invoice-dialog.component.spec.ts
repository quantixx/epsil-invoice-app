/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { CurrencyInvoiceDialogComponent } from '../../../../../../main/webapp/app/entities/currency-invoice/currency-invoice-dialog.component';
import { CurrencyInvoiceService } from '../../../../../../main/webapp/app/entities/currency-invoice/currency-invoice.service';
import { CurrencyInvoice } from '../../../../../../main/webapp/app/entities/currency-invoice/currency-invoice.model';

describe('Component Tests', () => {

    describe('CurrencyInvoice Management Dialog Component', () => {
        let comp: CurrencyInvoiceDialogComponent;
        let fixture: ComponentFixture<CurrencyInvoiceDialogComponent>;
        let service: CurrencyInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [CurrencyInvoiceDialogComponent],
                providers: [
                    CurrencyInvoiceService
                ]
            })
            .overrideTemplate(CurrencyInvoiceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CurrencyInvoiceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CurrencyInvoiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CurrencyInvoice(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.currency = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'currencyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CurrencyInvoice();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.currency = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'currencyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
