import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictedAreaComponent } from './restricted-area.component';

describe('RestrictedAreaComponent', () => {
  let component: RestrictedAreaComponent;
  let fixture: ComponentFixture<RestrictedAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestrictedAreaComponent]
    });
    fixture = TestBed.createComponent(RestrictedAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
