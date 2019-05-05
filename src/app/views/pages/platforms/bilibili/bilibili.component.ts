import { Component, OnInit } from '@angular/core';
import { BilibiliService } from '../../../../providers/platforms/bilibili.service';
import { ElectronService } from '../../../../providers/electron.service';
import {Platform, StreamList} from '../../../../Interface/Platform';
import {BilibiliRealRoomResponse} from '../../../../Interface/platforms/bilibili';

@Component({
  selector: 'app-bilibili',
  templateUrl: './bilibili.component.html',
  styleUrls: ['./bilibili.component.scss']
})
export class BilibiliComponent implements OnInit, Platform {

  constructor(
    private bilibiliService: BilibiliService,
    private electronService: ElectronService
  ) { }

  streamList: Array<StreamList>;
  showStreamListTable = false;
  roomId: string;

  ngOnInit() {
  }

  loadStreamList() {
    this.showStreamListTable = false;
    this.streamList = [];
    this.bilibiliService.getRealRoomId(this.roomId)
    .subscribe(response => {
      if (response.code !== 0) {
        this.electronService.remote.dialog.showMessageBox({type: 'error', message: '获取信息失败，请检查您的网络链接/流服务平台状态'});
    } else {
        this.bilibiliService.getStream(response.data.room_id)
        .subscribe(streamUri => {
                if (!streamUri.durl) {
                  this.electronService.remote.dialog.showMessageBox({type: 'error', message: '未解析到对应的房间号'});
                } else {
                    streamUri.durl.map(d => {
                      this.streamList.push({ uri: d.url, type: '视频', res: '原画' });
                    });
                    this.showStreamListTable = true;
                    this.electronService.remote.dialog.showMessageBox({type: 'info', message: '获取成功'});
                }
            });
          }
    }, error => {
      this.electronService.remote.dialog.showMessageBox({type: 'error', message: '获取信息失败，请检查您的网络链接/流服务平台状态'});
    });
  }

}
