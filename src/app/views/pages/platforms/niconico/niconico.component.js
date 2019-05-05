"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var NiconicoComponent = /** @class */ (function () {
    function NiconicoComponent(niconicoService, electronService, ref) {
        this.niconicoService = niconicoService;
        this.electronService = electronService;
        this.ref = ref;
        this.streamList = [];
        this.showStreamListTable = false;
        this.isSocketRequestClosed = false;
        this.videoId = 10010;
        this.broadcastId = 10010;
        this.streamQuality = 'high';
        this.isSocketAlive = true;
        this.handleSocketOpen = this.handleSocketOpen.bind(this);
        this.handleSocketMessage = this.handleSocketMessage.bind(this);
        this.closeSocketRequest = this.closeSocketRequest.bind(this);
        this.changeStreamQuality = this.changeStreamQuality.bind(this);
    }
    NiconicoComponent.prototype.ngOnInit = function () {
        M.AutoInit();
    };
    NiconicoComponent.prototype.loadStreamList = function () {
        var _this = this;
        this.niconicoService.requestLink(this.videoId)
            .subscribe(function (response) {
            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(response.toString(), 'text/html');
            var config = JSON.parse(htmlDoc.querySelector('#embedded-data')
                .getAttribute('data-props'));
            _this.createSocket(
            // Socket链接
            config.site.relive.webSocketUrl, 
            // 广播ID
            config.program.broadcastId);
        }, function (error) {
            _this.electronService.remote.dialog.showMessageBox({
                type: 'error',
                message: '获取信息失败，请检查您的网络链接/流服务平台状态'
            });
        });
    };
    NiconicoComponent.prototype.changeStreamQuality = function () {
        this.socket.send(JSON.stringify({
            'type': 'watch',
            'body': {
                'command': 'getstream',
                'requirement': {
                    'protocol': 'hls',
                    'quality': this.streamQuality,
                    'isLowLatency': true
                }
            }
        }));
    };
    NiconicoComponent.prototype.createSocket = function (socketURL, broadcastId) {
        this.socket = new WebSocket(socketURL);
        this.broadcastId = broadcastId;
        this.socket.addEventListener('open', this.handleSocketOpen);
        this.socket.addEventListener('message', this.handleSocketMessage);
        this.socket.addEventListener('error', this.handleFailed);
    };
    NiconicoComponent.prototype.handleSocketOpen = function () {
        console.log('Socket Opened');
        this.isSocketRequestClosed = false;
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
                        streamQuality: this.streamQuality,
                        isLowLatency: true
                    },
                    room: { isCommentable: true, protocol: 'webSocket' }
                }
            }
        }));
        this.changeStreamQuality();
        this.electronService.remote.dialog.showMessageBox({ type: 'info', message: '请在录流时将保持本页面最前运行！' });
    };
    NiconicoComponent.prototype.handleSocketMessage = function (_a) {
        var data = _a.data;
        data = JSON.parse(data);
        // just for debug
        // console.log(data);
        if (data.type === 'ping') {
            // 应答心跳包
            this.socket.send(JSON.stringify({ type: 'pong', body: {} }));
            console.log('Heartbeat packet sent');
        }
        else if (data.type) {
            switch (data.body.command) {
                // 回响时间
                case 'servertime':
                    this.socket.send(JSON.stringify({
                        type: 'watch',
                        body: { command: 'watching', params: [this.broadcastId, '-1', '0'] }
                    }));
                    console.log('Time response answered');
                    break;
                // m3u8播放列表
                case 'currentstream':
                    this.streamList = [
                        { uri: data.body.currentStream.uri,
                            res: data.body.currentStream.quality,
                            type: '视频' }
                    ];
                    this.showStreamListTable = true;
                    this.ref.detectChanges();
                    console.log('Got stream playlist at ' + data.body.currentStream.uri);
                    break;
            }
        }
    };
    NiconicoComponent.prototype.closeSocketRequest = function () {
        this.socket.close();
        this.isSocketRequestClosed = true;
        this.streamList = [];
        console.log('Socket service terminated.Have a good night.');
        this.electronService.remote.dialog.showMessageBox({ type: 'info', message: '心跳包回复已经终止,流链接即将失效' });
        this.socket = null;
    };
    NiconicoComponent.prototype.handleFailed = function () {
        console.log('failed');
        this.electronService.remote.dialog.showMessageBox({ type: 'error', message: '请求错误 请检查直播ID' });
    };
    NiconicoComponent.prototype.ngOnDestroy = function () {
        if (this.socket) {
            this.ref.detach();
            this.closeSocketRequest();
        }
    };
    NiconicoComponent = __decorate([
        core_1.Component({
            selector: 'app-niconico',
            templateUrl: './niconico.component.html',
            styleUrls: ['./niconico.component.scss']
        })
    ], NiconicoComponent);
    return NiconicoComponent;
}());
exports.NiconicoComponent = NiconicoComponent;
