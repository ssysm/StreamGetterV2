import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HibikiComponent } from './hibiki.component';

describe('HibikiComponent', () => {
  let component: HibikiComponent;
  let fixture: ComponentFixture<HibikiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HibikiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HibikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
