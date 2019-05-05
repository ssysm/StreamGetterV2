/** @class */ (function () {
    function class_1() {
    }
    return class_1;
}());
"container" >
    微博直播流获取 < /h3>
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
"col s12" >
    请输入节目ID < /p>
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
    style;
"width:200px";
id = "showId_inline";
name = "showId";
type = "text"[(ngModel)] = "showId" >
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
    < /div>
    < div;
var default_4 = /** @class */ (function () {
    function default_4() {
    }
    return default_4;
}());
"row" >
    /** @class */ (function () {
        function class_5() {
        }
        return class_5;
    }());
"col s4" >
;
for ( = "uid" > 微博用户ID < /label>
    < input; name = "uid"; type = "text"[(ngModel)] = "uid" >
    /div>
    < div) {
    var default_5 = /** @class */ (function () {
        function default_5() {
        }
        return default_5;
    }());
}
"col s4" >
;
for ( = "expiresHours" > 保活时长; ; )
    ;
小时;
/label>
    < input;
name = "expiresHours";
disabled;
var default_6 = /** @class */ (function () {
    function default_6() {
    }
    return default_6;
}());
"disbaled";
type = "number";
min = "1";
max = "4"[(ngModel)] = "expiresHours" >
    /div>
    < /div>
    < div;
var default_7 = /** @class */ (function () {
    function default_7() {
    }
    return default_7;
}());
"row";
id = "table" * ngIf;
"showStreamListTable" >
    /** @class */ (function () {
        function class_6() {
        }
        return class_6;
    }());
"responsive-table highlight striped" >
    类型 < /th>
    < th > 分辨率 < /th>
    < th > 链接 < /th>
    < /tr>
    < /thead>
    < tbody * ngFor;
"let item of streamList" >
    视频 < /td>
    < td > {};
{
    item.title;
}
/td>
    < td > {};
{
    item.url;
}
/td>
    < /tr>
    < /tbody>
    < /table>
    < /div>
    < /div>;
