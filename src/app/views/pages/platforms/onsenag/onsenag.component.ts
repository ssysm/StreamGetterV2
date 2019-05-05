import { Component, OnInit } from '@angular/core';
import { OnsenagService } from '../../../../providers/platforms/onsenag.service';
import { ElectronService } from '../../../../providers/electron.service';
import {Platform} from '../../../../Interface/Platform';

@Component({
  selector: 'app-onsenag',
  templateUrl: './onsenag.component.html',
  styleUrls: ['./onsenag.component.scss']
})
export class OnsenagComponent implements OnInit,Platform {

  constructor(
    private onsenagService: OnsenagService,
    private electronService: ElectronService
  ) { }

  programName = '';

  streamList = [];
  showStreamListTable = false;

  ngOnInit() {
  }

  loadStreamList() {
    this.showStreamListTable = false;
    this.streamList = [];
    this.onsenagService.getCallBack(this.programName)
      .subscribe(response => {
        response = response.toString();
        const jsonStr = response.slice(9, response.length - 3);
        console.log(jsonStr);
        const result = JSON.parse(jsonStr);
        // alg
        if (result.error) {
          this.electronService.remote.dialog.showMessageBox({
            type: 'error',
            message: '广播名称不正确'
          });
        } else {
          const tempArr = [];
          const URIs = result.moviePath;
          // tslint:disable-next-line:forin
          for ( const key in URIs) {
            tempArr.push({
              res: key,
              uri: URIs[key],
              type: '音频'
            });
          }
          this.streamList = tempArr;
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
