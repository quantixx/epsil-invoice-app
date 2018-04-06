//

import { TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';

//

describe('TableComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
