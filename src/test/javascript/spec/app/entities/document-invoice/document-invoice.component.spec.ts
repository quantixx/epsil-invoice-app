/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InvoiceappTestModule } from '../../../test.module';
import { DocumentInvoiceComponent } from '../../../../../../main/webapp/app/entities/document-invoice/document-invoice.component';
import { DocumentInvoiceService } from '../../../../../../main/webapp/app/entities/document-invoice/document-invoice.service';
import { DocumentInvoice } from '../../../../../../main/webapp/app/entities/document-invoice/document-invoice.model';

describe('Component Tests', () => {

    describe('DocumentInvoice Management Component', () => {
        let comp: DocumentInvoiceComponent;
        let fixture: ComponentFixture<DocumentInvoiceComponent>;
        let service: DocumentInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [DocumentInvoiceComponent],
                providers: [
                    DocumentInvoiceService
                ]
            })
            .overrideTemplate(DocumentInvoiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new DocumentInvoice(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.documents[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
