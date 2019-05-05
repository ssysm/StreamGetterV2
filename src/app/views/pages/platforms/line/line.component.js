"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var LineComponent = /** @class */ (function () {
    function LineComponent(lineService, electronService) {
        this.lineService = lineService;
        this.electronService = electronService;
        this.streamList = [];
        this.showStreamListTable = false;
    }
    LineComponent.prototype.ngOnInit = function () {
    };
    LineComponent.prototype.loadStreamList = function () {
        var _this = this;
        this.showStreamListTable = false;
        this.streamList = [];
        this.lineService.getStream(this.channelId, this.broadcastId)
            .subscribe(function (response) {
            if (response.status === 404) {
                _this.electronService.remote.dialog.showMessageBox({
                    type: 'error',
                    message: '广播ID/频道ID不正确'
                });
            }
            else if (response.liveStatus === 'FINISHED') {
                _this.electronService.remote.dialog.showMessageBox({
                    type: 'warning',
                    message: '直播已经结束 流链接失效'
                });
            }
            else {
                // tslint:disable-next-line:prefer-const
                var tempArr = [], isAudio = false;
                var result = response['liveHLSURLs'];
                // tslint:disable-next-line:forin
                for (var key in result) {
                    isAudio = key === 'abr' || key === 'aac';
                    tempArr.push({
                        isAudio: isAudio,
                        res: key,
                        link: result[key] ? result[key] : '无'
                    });
                }
                _this.streamList = tempArr;
                _this.showStreamListTable = true;
            }
        }, function (error) {
            _this.electronService.remote.dialog.showMessageBox({
                type: 'error',
                message: '获取信息失败，请检查您的网络链接/流服务平台状态'
            });
        });
    };
    LineComponent = __decorate([
        core_1.Component({
            selector: 'app-line',
            templateUrl: './line.component.html',
            styleUrls: ['./line.component.scss']
        })
    ], LineComponent);
    return LineComponent;
}());
exports.LineComponent = LineComponent;
