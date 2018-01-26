/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InvoiceappTestModule } from '../../../test.module';
import { TenantInvoiceComponent } from '../../../../../../main/webapp/app/entities/tenant-invoice/tenant-invoice.component';
import { TenantInvoiceService } from '../../../../../../main/webapp/app/entities/tenant-invoice/tenant-invoice.service';
import { TenantInvoice } from '../../../../../../main/webapp/app/entities/tenant-invoice/tenant-invoice.model';

describe('Component Tests', () => {

    describe('TenantInvoice Management Component', () => {
        let comp: TenantInvoiceComponent;
        let fixture: ComponentFixture<TenantInvoiceComponent>;
        let service: TenantInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InvoiceappTestModule],
                declarations: [TenantInvoiceComponent],
                providers: [
                    TenantInvoiceService
                ]
            })
            .overrideTemplate(TenantInvoiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TenantInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TenantInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TenantInvoice(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tenants[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
