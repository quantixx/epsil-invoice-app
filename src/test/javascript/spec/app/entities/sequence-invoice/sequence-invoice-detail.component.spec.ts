/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InvoiceappTestModule } from '../../../test.module';
import { SequenceInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/sequence-invoice/sequence-invoice-detail.component';
import { SequenceInvoiceService } from '../../../../../../main/webapp/app/entities/sequence-invoice/sequence-invoice.service';
import { SequenceInvoice } from '../../../../../../main/webapp/app/entities/sequence-invoice/sequence-invoice.model';

describe('Component Tests', () => {

    describe('SequenceInvoice Management Detail Component', () => {
        let comp: SequenceInvoiceDetailComponent;
        let fixture: ComponentFixture<SequenceInvoiceDetailComponent>;
        let service: SequenceInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [SequenceInvoiceDetailComponent],
                providers: [
                    SequenceInvoiceService
                ]
            })
            .overrideTemplate(SequenceInvoiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SequenceInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SequenceInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new SequenceInvoice(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.sequence).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
