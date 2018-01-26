/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceappTestModule } from '../../../test.module';
import { CountryInvoiceDialogComponent } from '../../../../../../main/webapp/app/entities/country-invoice/country-invoice-dialog.component';
import { CountryInvoiceService } from '../../../../../../main/webapp/app/entities/country-invoice/country-invoice.service';
import { CountryInvoice } from '../../../../../../main/webapp/app/entities/country-invoice/country-invoice.model';

describe('Component Tests', () => {

    describe('CountryInvoice Management Dialog Component', () => {
        let comp: CountryInvoiceDialogComponent;
        let fixture: ComponentFixture<CountryInvoiceDialogComponent>;
        let service: CountryInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [CountryInvoiceDialogComponent],
                providers: [
                    CountryInvoiceService
                ]
            })
            .overrideTemplate(CountryInvoiceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CountryInvoiceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryInvoiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CountryInvoice(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.country = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'countryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CountryInvoice();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.country = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'countryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
