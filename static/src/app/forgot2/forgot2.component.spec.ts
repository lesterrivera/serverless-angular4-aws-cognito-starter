import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Forgot2Component } from './forgot2.component';

describe('Forgot2Component', () => {
  let component: Forgot2Component;
  let fixture: ComponentFixture<Forgot2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Forgot2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Forgot2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
