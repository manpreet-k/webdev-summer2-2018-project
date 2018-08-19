import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSectionProfileComponent } from './admin-section-profile.component';

describe('AdminSectionProfileComponent', () => {
  let component: AdminSectionProfileComponent;
  let fixture: ComponentFixture<AdminSectionProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSectionProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSectionProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
