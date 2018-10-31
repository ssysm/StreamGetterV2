import { Component, OnInit } from '@angular/core';
import {HibikiService} from '../../services/hibiki.service';
import {ElectronService} from 'ngx-electron';

@Component({
  selector: 'app-hibiki',
  templateUrl: './hibiki.component.html',
  styleUrls: ['./hibiki.component.scss']
})
export class HibikiComponent implements OnInit {

  constructor(
    private hibikiService: HibikiService,
    private electronService: ElectronService
  ) { }

  accessId = '';

  streamList = [];
  showStreamListTable = false;

  ngOnInit() {
  }

  loadStreamList() {
    this.hibikiService.requestVideoId(this.accessId)
      .subscribe(response => {
        const videoId = response['episode']['video']['id'];
        this.hibikiService.requestStream(videoId)
          .subscribe(stream => {
            this.streamList = [{uri: stream['playlist_url']}];
            this.showStreamListTable = true;
            this.electronService.remote.dialog.showMessageBox({
              type: 'info',
              message: '链接请求成功 将在使用一次后失效，若失效请再次请求'
            });
          });
      } , error => {
        this.electronService.remote.dialog.showMessageBox({
          type: 'error',
          message: '获取信息失败，请检查您的网络链接/流服务平台状态'
        });
      });
  }

}
