//

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng2-mock-component';
import { PlaygroundAppRootComponent } from './playground-app-root.component';

//

describe('Integration::PlaygroundAppRootComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PlaygroundAppRootComponent,
        MockComponent({ selector: 'epsil-playground-navbar' })
      ],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PlaygroundAppRootComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });
});
