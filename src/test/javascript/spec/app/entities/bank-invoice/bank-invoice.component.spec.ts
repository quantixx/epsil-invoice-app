/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InvoiceappTestModule } from '../../../test.module';
import { BankInvoiceComponent } from '../../../../../../main/webapp/app/entities/bank-invoice/bank-invoice.component';
import { BankInvoiceService } from '../../../../../../main/webapp/app/entities/bank-invoice/bank-invoice.service';
import { BankInvoice } from '../../../../../../main/webapp/app/entities/bank-invoice/bank-invoice.model';

describe('Component Tests', () => {

    describe('BankInvoice Management Component', () => {
        let comp: BankInvoiceComponent;
        let fixture: ComponentFixture<BankInvoiceComponent>;
        let service: BankInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [BankInvoiceComponent],
                providers: [
                    BankInvoiceService
                ]
            })
            .overrideTemplate(BankInvoiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BankInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new BankInvoice(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.banks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
