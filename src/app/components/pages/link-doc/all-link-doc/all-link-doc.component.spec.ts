import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLinkDocComponent } from './all-link-doc.component';

describe('AllLinkDocComponent', () => {
  let component: AllLinkDocComponent;
  let fixture: ComponentFixture<AllLinkDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllLinkDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLinkDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
