import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedUserDetailsComponent } from './related-user-details.component';

describe('RelatedUserDetailsComponent', () => {
  let component: RelatedUserDetailsComponent;
  let fixture: ComponentFixture<RelatedUserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedUserDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
