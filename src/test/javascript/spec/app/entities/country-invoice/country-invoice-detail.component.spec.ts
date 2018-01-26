/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InvoiceappTestModule } from '../../../test.module';
import { CountryInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/country-invoice/country-invoice-detail.component';
import { CountryInvoiceService } from '../../../../../../main/webapp/app/entities/country-invoice/country-invoice.service';
import { CountryInvoice } from '../../../../../../main/webapp/app/entities/country-invoice/country-invoice.model';

describe('Component Tests', () => {

    describe('CountryInvoice Management Detail Component', () => {
        let comp: CountryInvoiceDetailComponent;
        let fixture: ComponentFixture<CountryInvoiceDetailComponent>;
        let service: CountryInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [CountryInvoiceDetailComponent],
                providers: [
                    CountryInvoiceService
                ]
            })
            .overrideTemplate(CountryInvoiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CountryInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new CountryInvoice(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.country).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
