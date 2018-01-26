/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InvoiceappTestModule } from '../../../test.module';
import { CountryInvoiceComponent } from '../../../../../../main/webapp/app/entities/country-invoice/country-invoice.component';
import { CountryInvoiceService } from '../../../../../../main/webapp/app/entities/country-invoice/country-invoice.service';
import { CountryInvoice } from '../../../../../../main/webapp/app/entities/country-invoice/country-invoice.model';

describe('Component Tests', () => {

    describe('CountryInvoice Management Component', () => {
        let comp: CountryInvoiceComponent;
        let fixture: ComponentFixture<CountryInvoiceComponent>;
        let service: CountryInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [CountryInvoiceComponent],
                providers: [
                    CountryInvoiceService
                ]
            })
            .overrideTemplate(CountryInvoiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CountryInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new CountryInvoice(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.countries[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
