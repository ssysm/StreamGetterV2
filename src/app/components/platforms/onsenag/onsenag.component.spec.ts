import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsenagComponent } from './onsenag.component';

describe('OnsenagComponent', () => {
  let component: OnsenagComponent;
  let fixture: ComponentFixture<OnsenagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnsenagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnsenagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
