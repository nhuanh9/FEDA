import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNotiComponent } from './new-noti.component';

describe('NewNotiComponent', () => {
  let component: NewNotiComponent;
  let fixture: ComponentFixture<NewNotiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNotiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
