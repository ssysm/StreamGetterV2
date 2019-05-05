"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var SinaLiveComponent = /** @class */ (function () {
    function SinaLiveComponent(sinaLiveService, electronService) {
        this.sinaLiveService = sinaLiveService;
        this.electronService = electronService;
        this.showId = '';
        this.uid = '6778227457';
        this.expiresHours = 2;
        this.streamList = [];
        this.showStreamListTable = false;
    }
    SinaLiveComponent.prototype.ngOnInit = function () {
    };
    SinaLiveComponent.prototype.loadStreamList = function () {
        var _this = this;
        this.showStreamListTable = false;
        this.streamList = [];
        var queryStr = this.sinaLiveService.buildQueryString(this.showId, this.uid);
        var sign = this.sinaLiveService.getSign(queryStr);
        var uri = this.sinaLiveService.buildStreamUri();
        this.sinaLiveService.getStream(uri)
            .subscribe(function (response) {
            if (response['status'] === 0) {
                _this.electronService.remote.dialog.showMessageBox({
                    type: 'error',
                    message: '获取信息失败，请检查您的网络链接/流服务平台状态'
                });
            }
            else {
                _this.streamList = response['stream'];
                _this.streamList.push({
                    title: 'RTMP',
                    url: response['rtmp_url']
                });
                _this.showStreamListTable = true;
            }
        }, function (err) {
            _this.electronService.remote.dialog.showMessageBox({
                type: 'error',
                message: '获取信息失败，请检查您的网络链接/流服务平台状态'
            });
        });
    };
    SinaLiveComponent = __decorate([
        core_1.Component({
            selector: 'app-sina-live',
            templateUrl: './sina-live.component.html',
            styleUrls: ['./sina-live.component.scss']
        })
    ], SinaLiveComponent);
    return SinaLiveComponent;
}());
exports.SinaLiveComponent = SinaLiveComponent;
