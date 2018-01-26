/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InvoiceappTestModule } from '../../../test.module';
import { LanguageInvoiceComponent } from '../../../../../../main/webapp/app/entities/language-invoice/language-invoice.component';
import { LanguageInvoiceService } from '../../../../../../main/webapp/app/entities/language-invoice/language-invoice.service';
import { LanguageInvoice } from '../../../../../../main/webapp/app/entities/language-invoice/language-invoice.model';

describe('Component Tests', () => {

    describe('LanguageInvoice Management Component', () => {
        let comp: LanguageInvoiceComponent;
        let fixture: ComponentFixture<LanguageInvoiceComponent>;
        let service: LanguageInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [LanguageInvoiceComponent],
                providers: [
                    LanguageInvoiceService
                ]
            })
            .overrideTemplate(LanguageInvoiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LanguageInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanguageInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new LanguageInvoice(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.languages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
