import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NiconicoComponent } from './niconico.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ElectronService } from 'ngx-electron';

describe('NiconicoComponent', () => {
  let component: NiconicoComponent;
  let fixture: ComponentFixture<NiconicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NiconicoComponent ],
      imports: [FormsModule, HttpClientModule],
      providers: [ElectronService]
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
