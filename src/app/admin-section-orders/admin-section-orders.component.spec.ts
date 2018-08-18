import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSectionOrdersComponent } from './admin-section-orders.component';

describe('AdminSectionOrdersComponent', () => {
  let component: AdminSectionOrdersComponent;
  let fixture: ComponentFixture<AdminSectionOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSectionOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSectionOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
