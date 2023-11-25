import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashNoLoginComponent } from './dash-no-login.component';

describe('DashNoLoginComponent', () => {
  let component: DashNoLoginComponent;
  let fixture: ComponentFixture<DashNoLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashNoLoginComponent]
    });
    fixture = TestBed.createComponent(DashNoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
