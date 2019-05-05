import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NiconicoComponent } from './niconico.component';

describe('NiconicoComponent', () => {
  let component: NiconicoComponent;
  let fixture: ComponentFixture<NiconicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NiconicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NiconicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
