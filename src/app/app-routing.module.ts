import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BilibiliComponent } from './components/platforms/bilibili/bilibili.component';
import { HibikiComponent } from './components/platforms/hibiki/hibiki.component';
import { LineComponent } from './components/platforms/line/line.component';
import { NiconicoComponent } from './components/platforms/niconico/niconico.component';
import { SessionComponent } from './components/session/session.component';
import { AboutComponent } from './components/about/about.component';
import { OnsenagComponent } from './components/platforms/onsenag/onsenag.component';
import { SinaLiveComponent } from './components/platforms/sina-live/sina-live.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'bilibili',
        component: BilibiliComponent
      },
      {
        path: 'hibiki',
        component: HibikiComponent
      },
      {
        path: 'line',
        component: LineComponent
      },
      {
        path: 'niconico',
        component: NiconicoComponent
      },
      {
        path: 'onsenag',
        component: OnsenagComponent
      },
      {
        path: 'sina-live',
        component: SinaLiveComponent
      },
      {
          path: 'settings',
          children: [
              {
                path: 'about',
                component: AboutComponent
              },
              {
                  path: 'session',
                  component: SessionComponent
              }
          ]
      }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
