import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilibiliComponent } from './bilibili.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ElectronService } from 'ngx-electron';

describe('BilibiliComponent', () => {
  let component: BilibiliComponent;
  let fixture: ComponentFixture<BilibiliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilibiliComponent ],
      imports: [FormsModule, HttpClientModule],
      providers: [ElectronService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilibiliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
