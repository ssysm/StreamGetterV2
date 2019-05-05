import { Component, OnInit } from '@angular/core';
import {HibikiService} from '../../../../providers/platforms/hibiki.service';
import {ElectronService} from '../../../../providers/electron.service';
import {Platform, StreamList} from '../../../../Interface/Platform';

@Component({
  selector: 'app-hibiki',
  templateUrl: './hibiki.component.html',
  styleUrls: ['./hibiki.component.scss']
})
export class HibikiComponent implements OnInit, Platform {

  constructor(
    private hibikiService: HibikiService,
    private electronService: ElectronService
  ) { }

  accessId = '';

  streamList: Array<StreamList>;
  showStreamListTable = false;

  ngOnInit() {
  }

  loadStreamList() {
    this.hibikiService.requestProgramId(this.accessId)
      .subscribe(response => {
        const programId = response.episode.video.id;
        this.hibikiService.requestStream(programId)
          .subscribe(stream => {
            this.streamList = [{uri: stream.playlist_url, res: 'aac', type: '音频'}];
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
