import { HomeComponent } from './views/pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BilibiliComponent } from './views/pages/platforms/bilibili/bilibili.component';
import { HibikiComponent } from './views/pages/platforms/hibiki/hibiki.component';
import { LineComponent } from './views/pages/platforms/line/line.component';
import { NiconicoComponent } from './views/pages/platforms/niconico/niconico.component';
import { SessionComponent } from './views/pages/session/session.component';
import { AboutComponent } from './views/pages/about/about.component';
import { OnsenagComponent } from './views/pages/platforms/onsenag/onsenag.component';
import { SinaLiveComponent } from './views/pages/platforms/sina-live/sina-live.component';

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
