import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';

import {ElectronService} from '../../../providers/electron.service';
import {NiconicoService} from '../../../providers/platforms/niconico.service';

@Component({
  selector: 'app-niconico',
  templateUrl: './niconico.component.html',
  styleUrls: ['./niconico.component.scss']
})
export class NiconicoComponent implements OnInit, OnDestroy {
  socket;

  streamList = [];
  showStreamListTable = false;
  isSocketRequestClosed = false;

  videoId = 10010;
  broadcastId = 10010;

  isSocketAlive = true;

  constructor(
      private niconicoService: NiconicoService,
      private electronService: ElectronService,
      private ref: ChangeDetectorRef) {
        this.handleSocketOpen = this.handleSocketOpen.bind(this);
        this.handleSocketMessage = this.handleSocketMessage.bind(this);
        this.closeSocketRequest = this.closeSocketRequest.bind(this);
      }

  ngOnInit() {}

  requestLink() {
    this.niconicoService.requestLink(this.videoId)
        .subscribe(
            response => {
              const parser = new DOMParser();
              const htmlDoc =
                  parser.parseFromString(response.toString(), 'text/html');
              const config = JSON.parse(htmlDoc.querySelector('#embedded-data')
                                            .getAttribute('data-props'));
              this.createSocket(
                  // Socket链接
                  config.site.relive.webSocketUrl,
                  // 广播ID
                  config.program.broadcastId);
            },
            error => {
              this.electronService.remote.dialog.showMessageBox({
                type: 'error',
                message: '获取信息失败，请检查您的网络链接/流服务平台状态'
              });
            });
  }

  createSocket(socketURL, broadcastId) {
    this.socket = new WebSocket(socketURL);
    this.broadcastId = broadcastId;
    this.socket.addEventListener('open', this.handleSocketOpen);
    this.socket.addEventListener('message', this.handleSocketMessage);
    this.socket.addEventListener('error', this.handleFailed);
  }

  handleSocketOpen() {
    console.log('Socket Opened');
    this.socket.send(JSON.stringify({
      type: 'watch',
      body: {
        command: 'getpermit',
        requirement: {
          broadcastId: this.broadcastId,
          route: '',
          stream: {
            protocol: 'hls',
            requireNewStream: true,
            priorStreamQuality: 'high',
            isLowLatency: true
          },
          room: {isCommentable: true, protocol: 'webSocket'}
        }
      }
    }));
  }

  handleSocketMessage({data}) {
    data = JSON.parse(data);
    // just for debug
    // console.log(data);
    if (data.type === 'ping') {
      // 应答心跳包
      this.socket.send(JSON.stringify({type: 'pong', body: {}}));
      console.log('Heartbeat packet sent');
    } else if (data.type) {
      switch (data.body.command) {
        // 回响时间
        case 'servertime':
          this.socket.send(JSON.stringify({
            type: 'watch',
            body: {command: 'watching', params: [this.broadcastId, '-1', '0']}
          }));
          console.log('Time response answered');
          break;
        // m3u8播放列表
        case 'currentstream':
          this.streamList = [{url: data.body.currentStream.uri}];
          this.showStreamListTable = true;
          this.electronService.remote.dialog.showMessageBox(
              {type: 'info', message: '请在录流时将保持本页面最前运行！'});
          this.ref.detectChanges();
          console.log('Got stream playlist at ' + data.body.currentStream.uri);
          break;
      }
    }
  }

  closeSocketRequest() {
    this.socket.close();
    this.isSocketRequestClosed = true;
    this.streamList = [];
    this.ref.detectChanges();
    console.log('Socket service terminated.Have a good night.');
    this.electronService.remote.dialog.showMessageBox({type: 'info', message: '心跳包回复已经终止,流链接即将失效'});
  }

  handleFailed() {
    console.log('failed');
    this.electronService.remote.dialog.showMessageBox(
        {type: 'error', message: '请求错误 请检查直播ID'});
  }

  ngOnDestroy() {}
}
