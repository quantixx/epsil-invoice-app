/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InvoiceappTestModule } from '../../../test.module';
import { FamilyInvoiceComponent } from '../../../../../../main/webapp/app/entities/family-invoice/family-invoice.component';
import { FamilyInvoiceService } from '../../../../../../main/webapp/app/entities/family-invoice/family-invoice.service';
import { FamilyInvoice } from '../../../../../../main/webapp/app/entities/family-invoice/family-invoice.model';

describe('Component Tests', () => {

    describe('FamilyInvoice Management Component', () => {
        let comp: FamilyInvoiceComponent;
        let fixture: ComponentFixture<FamilyInvoiceComponent>;
        let service: FamilyInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [FamilyInvoiceComponent],
                providers: [
                    FamilyInvoiceService
                ]
            })
            .overrideTemplate(FamilyInvoiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FamilyInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FamilyInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new FamilyInvoice(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.families[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
