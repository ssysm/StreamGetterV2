import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BilibiliComponent } from './page/bilibili/bilibili.component';
import { LineComponent } from './page/line/line.component';
import { NiconicoComponent } from './page/niconico/niconico.component';
import { HibikiComponent } from './page/hibiki/hibiki.component';
import { HomeComponent } from './page/home/home.component';
import { NavbarComponent } from './particals/navbar/navbar.component';
import { BilibiliService } from './services/bilibili.service';
import { HibikiService } from './services/hibiki.service';
import { LineService } from './services/line.service';
import { NiconicoService } from './services/niconico.service';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    BilibiliComponent,
    LineComponent,
    NiconicoComponent,
    HibikiComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxElectronModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    BilibiliService,
    HibikiService,
    LineService,
    NiconicoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
