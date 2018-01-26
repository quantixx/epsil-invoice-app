/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InvoiceappTestModule } from '../../../test.module';
import { SequenceInvoiceComponent } from '../../../../../../main/webapp/app/entities/sequence-invoice/sequence-invoice.component';
import { SequenceInvoiceService } from '../../../../../../main/webapp/app/entities/sequence-invoice/sequence-invoice.service';
import { SequenceInvoice } from '../../../../../../main/webapp/app/entities/sequence-invoice/sequence-invoice.model';

describe('Component Tests', () => {

    describe('SequenceInvoice Management Component', () => {
        let comp: SequenceInvoiceComponent;
        let fixture: ComponentFixture<SequenceInvoiceComponent>;
        let service: SequenceInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [SequenceInvoiceComponent],
                providers: [
                    SequenceInvoiceService
                ]
            })
            .overrideTemplate(SequenceInvoiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SequenceInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SequenceInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new SequenceInvoice(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.sequences[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
