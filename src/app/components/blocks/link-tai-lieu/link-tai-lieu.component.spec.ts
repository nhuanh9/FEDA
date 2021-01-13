import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkTaiLieuComponent } from './link-tai-lieu.component';

describe('LinkTaiLieuComponent', () => {
  let component: LinkTaiLieuComponent;
  let fixture: ComponentFixture<LinkTaiLieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkTaiLieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkTaiLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
