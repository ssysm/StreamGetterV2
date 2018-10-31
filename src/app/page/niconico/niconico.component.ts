import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NiconicoService} from '../../services/niconico.service';
import {ElectronService} from 'ngx-electron';

@Component({
  selector: 'app-niconico',
  templateUrl: './niconico.component.html',
  styleUrls: ['./niconico.component.scss']
})
export class NiconicoComponent implements OnInit {

  constructor(
    private niconicoService: NiconicoService,
    private electronService: ElectronService,
    private ref: ChangeDetectorRef
  ) { }

  streamList = [];
  showStreamListTable = false;
  isSocketRequestClosed = false;

  videoId = 10010;

  isSocketAlive = true;

  ngOnInit() {
    this.electronService.ipcRenderer.on('niconico_responseStream', this.loadStreamList.bind(this));
    this.electronService.ipcRenderer.on('niconico_socketClosed', this.socketClosed.bind(this));
    this.electronService.ipcRenderer.on('niconico_failed', this.handleFailed.bind(this));
  }

  requestLink() {
    this.showStreamListTable = false;
    this.streamList = [];
    this.niconicoService.requestLink({videoId: this.videoId});
  }

  loadStreamList(event, args) {
    console.log(args);
    this.streamList = [{
      url: args
    }];
    this.showStreamListTable = true;
    this.electronService.remote.dialog.showMessageBox({type: 'info', message: '请在录流时将保持本页面最前运行！'});
    this.ref.detectChanges();
  }

  closeSocketRequest() {
    this.niconicoService.closeSocket();
    this.isSocketRequestClosed = true;
    this.ref.detectChanges();
    this.electronService.remote.dialog.showMessageBox({type: 'warn', message: '心跳包回复已经终止,流链接即将失效'});
  }

  socketClosed() {
    this.isSocketAlive = false;
  }

  handleFailed() {
    console.log('failed');
    this.electronService.remote.dialog.showMessageBox({type: 'error', message: '请求错误 请检查直播ID'});
  }

}
