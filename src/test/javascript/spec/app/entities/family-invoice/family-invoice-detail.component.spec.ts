/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InvoiceappTestModule } from '../../../test.module';
import { FamilyInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/family-invoice/family-invoice-detail.component';
import { FamilyInvoiceService } from '../../../../../../main/webapp/app/entities/family-invoice/family-invoice.service';
import { FamilyInvoice } from '../../../../../../main/webapp/app/entities/family-invoice/family-invoice.model';

describe('Component Tests', () => {

    describe('FamilyInvoice Management Detail Component', () => {
        let comp: FamilyInvoiceDetailComponent;
        let fixture: ComponentFixture<FamilyInvoiceDetailComponent>;
        let service: FamilyInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [FamilyInvoiceDetailComponent],
                providers: [
                    FamilyInvoiceService
                ]
            })
            .overrideTemplate(FamilyInvoiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FamilyInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FamilyInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new FamilyInvoice(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.family).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
