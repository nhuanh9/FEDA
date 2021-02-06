import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLinkDocComponent } from './add-link-doc.component';

describe('AddLinkDocComponent', () => {
  let component: AddLinkDocComponent;
  let fixture: ComponentFixture<AddLinkDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLinkDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLinkDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
