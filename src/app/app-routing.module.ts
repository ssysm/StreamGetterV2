import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { BilibiliComponent } from './page/bilibili/bilibili.component';
import { HibikiComponent } from './page/hibiki/hibiki.component';
import { LineComponent } from './page/line/line.component';
import { NiconicoComponent } from './page/niconico/niconico.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
