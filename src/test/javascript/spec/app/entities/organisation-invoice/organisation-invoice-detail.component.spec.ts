/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InvoiceappTestModule } from '../../../test.module';
import { OrganisationInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/organisation-invoice/organisation-invoice-detail.component';
import { OrganisationInvoiceService } from '../../../../../../main/webapp/app/entities/organisation-invoice/organisation-invoice.service';
import { OrganisationInvoice } from '../../../../../../main/webapp/app/entities/organisation-invoice/organisation-invoice.model';

describe('Component Tests', () => {

    describe('OrganisationInvoice Management Detail Component', () => {
        let comp: OrganisationInvoiceDetailComponent;
        let fixture: ComponentFixture<OrganisationInvoiceDetailComponent>;
        let service: OrganisationInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [OrganisationInvoiceDetailComponent],
                providers: [
                    OrganisationInvoiceService
                ]
            })
            .overrideTemplate(OrganisationInvoiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrganisationInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganisationInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new OrganisationInvoice(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.organisation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
