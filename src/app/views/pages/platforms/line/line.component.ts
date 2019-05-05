import { Component , OnInit } from '@angular/core';
import { LineService } from '../../../../providers/platforms/line.service';
import {ElectronService} from '../../../../providers/electron.service';
import {Platform} from '../../../../Interface/Platform';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit, Platform {

  constructor(
    private lineService: LineService,
    private electronService: ElectronService
  ) {
  }

  channelId: number;
  broadcastId: number;

  streamList = [];
  showStreamListTable = false;

  ngOnInit() {
  }

  loadStreamList() {
    this.showStreamListTable = false;
    this.streamList = [];
    this.lineService.getStream(this.channelId, this.broadcastId)
      .subscribe(response => {
        if (response.status === 404) {
          this.electronService.remote.dialog.showMessageBox({
            type: 'error',
            message: '广播ID/频道ID不正确'
          });
        } else if (response.liveStatus === 'FINISHED') {
          this.electronService.remote.dialog.showMessageBox({
            type: 'warning',
            message: '直播已经结束 流链接失效'
          });
        } else {
          // tslint:disable-next-line:prefer-const
          let tempArr = [], isAudio = false;
          const result = response['liveHLSURLs'];
          // tslint:disable-next-line:forin
          for (const key in result) {
            isAudio = key === 'abr' || key === 'aac';
            tempArr.push({
              isAudio,
              res: key,
              link: result[key] ? result[key] : '无'
            });
          }
          this.streamList = tempArr;
          this.showStreamListTable = true;
        }
      }, error => {
        this.electronService.remote.dialog.showMessageBox({
          type: 'error',
          message: '获取信息失败，请检查您的网络链接/流服务平台状态'
        });
      });
  }
}
