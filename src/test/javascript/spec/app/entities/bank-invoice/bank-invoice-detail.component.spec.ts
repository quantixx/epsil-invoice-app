/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InvoiceappTestModule } from '../../../test.module';
import { BankInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/bank-invoice/bank-invoice-detail.component';
import { BankInvoiceService } from '../../../../../../main/webapp/app/entities/bank-invoice/bank-invoice.service';
import { BankInvoice } from '../../../../../../main/webapp/app/entities/bank-invoice/bank-invoice.model';

describe('Component Tests', () => {

    describe('BankInvoice Management Detail Component', () => {
        let comp: BankInvoiceDetailComponent;
        let fixture: ComponentFixture<BankInvoiceDetailComponent>;
        let service: BankInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [BankInvoiceDetailComponent],
                providers: [
                    BankInvoiceService
                ]
            })
            .overrideTemplate(BankInvoiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BankInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new BankInvoice(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bank).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
