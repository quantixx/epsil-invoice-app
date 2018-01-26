/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InvoiceappTestModule } from '../../../test.module';
import { TenantInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/tenant-invoice/tenant-invoice-detail.component';
import { TenantInvoiceService } from '../../../../../../main/webapp/app/entities/tenant-invoice/tenant-invoice.service';
import { TenantInvoice } from '../../../../../../main/webapp/app/entities/tenant-invoice/tenant-invoice.model';

describe('Component Tests', () => {

    describe('TenantInvoice Management Detail Component', () => {
        let comp: TenantInvoiceDetailComponent;
        let fixture: ComponentFixture<TenantInvoiceDetailComponent>;
        let service: TenantInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [TenantInvoiceDetailComponent],
                providers: [
                    TenantInvoiceService
                ]
            })
            .overrideTemplate(TenantInvoiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TenantInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TenantInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TenantInvoice(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tenant).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
