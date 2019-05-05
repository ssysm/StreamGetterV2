/** @class */ (function () {
    function class_1() {
    }
    return class_1;
}());
"container" >
    Niconico;
生放流获取 < /h3>
    < div;
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    return default_1;
}());
"row" >
    /** @class */ (function () {
        function class_2() {
        }
        return class_2;
    }());
"col s12" >
    /** @class */ (function () {
        function class_3() {
        }
        return class_3;
    }());
"row" >
    /** @class */ (function () {
        function class_4() {
        }
        return class_4;
    }());
"col s8" >
    请输入直播间ID < /p>
    < span >
    http;
/span>
    < div;
var default_2 = /** @class */ (function () {
    function default_2() {
    }
    return default_2;
}());
"input-field inline" >
    id;
"videoId_inline";
name = "videoId";
type = "text"[(ngModel)] = "videoId" >
    /div>
    < a;
var default_3 = /** @class */ (function () {
    function default_3() {
    }
    return default_3;
}());
"btn"(click) = "loadStreamList()" > 解流 < /a>
    < /div>
    < /div>
    < /form>
    < div;
var default_4 = /** @class */ (function () {
    function default_4() {
    }
    return default_4;
}());
"input-field col s4" >
;
"streamQuality"(change) = "changeStreamQuality()" >
    value;
"high";
selected > 最高;
2;
Mbps < /option>
    < option;
value = "normal" > 高;
1;
Mbps < /option>
    < option;
value = "low" > 低;
384;
Kbps < /option>
    < option;
value = "super_low" > 超低;
192;
Kbps < /option>
    < /select>
    < label > 流质量选择 < /label>
    < /div>
    < /div>
    < div;
var default_5 = /** @class */ (function () {
    function default_5() {
    }
    return default_5;
}());
"row" >
    请在录流时将保持本页面最前运行;
/b></h3 >
    /** @class */ (function () {
        function class_5() {
        }
        return class_5;
    }());
"btn"(click) = "closeSocketRequest()" * ngIf;
"!isSocketRequestClosed && showStreamListTable" > 关闭心跳包链接 < /a>
    < /div>
    < app - url - table[urlTable];
"streamList" * ngIf;
"showStreamListTable" > /app-url-table>
    < /div>;
