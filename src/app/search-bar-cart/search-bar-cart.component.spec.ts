import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarCartComponent } from './search-bar-cart.component';

describe('SearchBarCartComponent', () => {
  let component: SearchBarCartComponent;
  let fixture: ComponentFixture<SearchBarCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
