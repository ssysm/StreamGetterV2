import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinaLiveComponent } from './sina-live.component';

describe('SinaLiveComponent', () => {
  let component: SinaLiveComponent;
  let fixture: ComponentFixture<SinaLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinaLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinaLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
