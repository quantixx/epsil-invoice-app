/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InvoiceappTestModule } from '../../../test.module';
import { LanguageInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/language-invoice/language-invoice-detail.component';
import { LanguageInvoiceService } from '../../../../../../main/webapp/app/entities/language-invoice/language-invoice.service';
import { LanguageInvoice } from '../../../../../../main/webapp/app/entities/language-invoice/language-invoice.model';

describe('Component Tests', () => {

    describe('LanguageInvoice Management Detail Component', () => {
        let comp: LanguageInvoiceDetailComponent;
        let fixture: ComponentFixture<LanguageInvoiceDetailComponent>;
        let service: LanguageInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [LanguageInvoiceDetailComponent],
                providers: [
                    LanguageInvoiceService
                ]
            })
            .overrideTemplate(LanguageInvoiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LanguageInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanguageInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new LanguageInvoice(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.language).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
