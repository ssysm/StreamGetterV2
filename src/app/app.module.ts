import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/pages/home/home.component';
import { BilibiliService } from './providers/platforms/bilibili.service';
import { HibikiService } from './providers/platforms/hibiki.service';
import { LineService } from './providers/platforms/line.service';
import { SessionComponent } from './views/pages/session/session.component';
import { NavbarComponent } from './views/particals/navbar/navbar.component';
import { BilibiliComponent } from './views/pages/platforms/bilibili/bilibili.component';
import { HibikiComponent } from './views/pages/platforms/hibiki/hibiki.component';
import { LineComponent } from './views/pages/platforms/line/line.component';
import { FfmpegCommandPipe } from './pipes/ffmpeg-command.pipe';
import { NiconicoComponent } from './views/pages/platforms/niconico/niconico.component';
import { AboutComponent } from './views/pages/about/about.component';
import { OnsenagComponent } from './views/pages/platforms/onsenag/onsenag.component';
import { SinaLiveComponent } from './views/pages/platforms/sina-live/sina-live.component';
import { UrlTableComponent } from './views/components/url-table/url-table.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    SessionComponent,
    NavbarComponent,
    BilibiliComponent,
    HibikiComponent,
    LineComponent,
    FfmpegCommandPipe,
    NiconicoComponent,
    AboutComponent,
    OnsenagComponent,
    SinaLiveComponent,
    UrlTableComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ElectronService,
    BilibiliService,
    HibikiService,
    LineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
