import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkdocsComponent } from './linkdocs.component';

describe('LinkdocsComponent', () => {
  let component: LinkdocsComponent;
  let fixture: ComponentFixture<LinkdocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkdocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkdocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
