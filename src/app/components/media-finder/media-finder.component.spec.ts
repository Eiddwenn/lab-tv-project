import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFinderComponent } from './media-finder.component';

describe('MediaFinderComponent', () => {
  let component: MediaFinderComponent;
  let fixture: ComponentFixture<MediaFinderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediaFinderComponent]
    });
    fixture = TestBed.createComponent(MediaFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
