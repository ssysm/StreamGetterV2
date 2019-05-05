import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HibikiComponent } from './hibiki.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ElectronService } from 'ngx-electron';

describe('HibikiComponent', () => {
  let component: HibikiComponent;
  let fixture: ComponentFixture<HibikiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HibikiComponent ],
      imports: [FormsModule, HttpClientModule],
      providers: [ElectronService]
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
