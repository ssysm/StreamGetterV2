import { Component, OnInit } from '@angular/core';
import { SinaLiveService } from '../../../../providers/platforms/sina-live.service';
import { ElectronService } from '../../../../providers/electron.service';

@Component({
  selector: 'app-sina-live',
  templateUrl: './sina-live.component.html',
  styleUrls: ['./sina-live.component.scss']
})
export class SinaLiveComponent implements OnInit {

  constructor(
    private sinaLiveService: SinaLiveService,
    private electronService: ElectronService
  ) { }

  showId = '';
  uid = '6778227457';
  expiresHours = 2;

  streamList = [];
  showStreamListTable = false;

  ngOnInit() {
  }

  loadStreamList() {
    this.showStreamListTable = false;
    this.streamList = [];
    let queryStr = this.sinaLiveService.buildQueryString(this.showId, this.uid);
    this.sinaLiveService.getSign(queryStr);
    let uri = this.sinaLiveService.buildStreamUri();

    this.sinaLiveService.getStream(uri)
    .subscribe(response => {
      if (response.status !== '3') {
        this.electronService.remote.dialog.showMessageBox({
          type: 'error',
          message: '获取信息失败，请检查您的网络链接/流服务平台状态'
        });
      } else {
        response.stream.map(d => {
          this.streamList.push({
            uri: d.url,
            type: '视频',
            res: d.title
          });
        });
        this.showStreamListTable = true;
      }
    }, err => {
      this.electronService.remote.dialog.showMessageBox({
        type: 'error',
        message: '获取信息失败，请检查您的网络链接/流服务平台状态'
      });
    });
  }

}
