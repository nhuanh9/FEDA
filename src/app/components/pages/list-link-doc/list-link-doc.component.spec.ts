import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLinkDocComponent } from './list-link-doc.component';

describe('ListLinkDocComponent', () => {
  let component: ListLinkDocComponent;
  let fixture: ComponentFixture<ListLinkDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLinkDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLinkDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
