/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InvoiceappTestModule } from '../../../test.module';
import { DocumentInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/document-invoice/document-invoice-detail.component';
import { DocumentInvoiceService } from '../../../../../../main/webapp/app/entities/document-invoice/document-invoice.service';
import { DocumentInvoice } from '../../../../../../main/webapp/app/entities/document-invoice/document-invoice.model';

describe('Component Tests', () => {

    describe('DocumentInvoice Management Detail Component', () => {
        let comp: DocumentInvoiceDetailComponent;
        let fixture: ComponentFixture<DocumentInvoiceDetailComponent>;
        let service: DocumentInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [DocumentInvoiceDetailComponent],
                providers: [
                    DocumentInvoiceService
                ]
            })
            .overrideTemplate(DocumentInvoiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new DocumentInvoice(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.document).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
