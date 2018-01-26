//

import { TestBed } from '@angular/core/testing';
import { InvoicesRootComponent } from './invoice_component';

//

describe('InvoicesRootComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoicesRootComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(InvoicesRootComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
