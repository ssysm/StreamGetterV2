"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var OnsenagComponent = /** @class */ (function () {
    function OnsenagComponent(onsenagService, electronService) {
        this.onsenagService = onsenagService;
        this.electronService = electronService;
        this.programName = '';
        this.streamList = [];
        this.showStreamListTable = false;
    }
    OnsenagComponent.prototype.ngOnInit = function () {
    };
    OnsenagComponent.prototype.loadStreamList = function () {
        var _this = this;
        this.showStreamListTable = false;
        this.streamList = [];
        this.onsenagService.getCallBack(this.programName)
            .subscribe(function (response) {
            response = response.toString();
            var jsonStr = response.slice(9, response.length - 3);
            console.log(jsonStr);
            var result = JSON.parse(jsonStr);
            // alg
            if (result.error) {
                _this.electronService.remote.dialog.showMessageBox({
                    type: 'error',
                    message: '广播名称不正确'
                });
            }
            else {
                var tempArr = [];
                var URIs = result.moviePath;
                // tslint:disable-next-line:forin
                for (var key in URIs) {
                    tempArr.push({
                        res: key,
                        uri: URIs[key],
                        type: '音频'
                    });
                }
                _this.streamList = tempArr;
                _this.showStreamListTable = true;
            }
        }, function (err) {
            _this.electronService.remote.dialog.showMessageBox({
                type: 'error',
                message: '获取信息失败，请检查您的网络链接/流服务平台状态'
            });
        });
    };
    OnsenagComponent = __decorate([
        core_1.Component({
            selector: 'app-onsenag',
            templateUrl: './onsenag.component.html',
            styleUrls: ['./onsenag.component.scss']
        })
    ], OnsenagComponent);
    return OnsenagComponent;
}());
exports.OnsenagComponent = OnsenagComponent;
