today = new Date();
function initArray() {
    this.length = initArray.arguments.length
    for (var i = 0; i < this.length; i++)
        this[i + 1] = initArray.arguments[i]
}
var d = new initArray("周日", "周一", "周二", "周三", "周四", "周五", "周六");
var st = { '0_5': '小寒', '0_20': '大寒', '1_3': '立春', '1_18': '雨水', '2_5': '惊蜇', '2_20': '春分', '3_4': '清明', '3_19': '谷雨', '4_5': '立夏', '4_20': '小满', '5_5': '芒种', '5_21': '夏至', '6_6': '小暑', '6_22': '大暑', '7_7': '立秋', '7_22': '处暑', '8_7': '白露', '8_22': '秋分', '9_8': '寒露', '9_23': '霜降', '10_7': '立冬', '10_22': '小雪', '11_6': '大雪', '11_21': '冬至' };
var _today = [today.getFullYear(), "-", today.getMonth() + 1, "-", today.getDate()].join('');
document.getElementById('gregorian').innerHTML = _today;
calendar = new Date();
month = calendar.getMonth();
date = calendar.getDate();
// document.getElementById('week').innerHTML = [d[today.getDay() + 1], st[month + '_' + date]].join(' ')
var _week = [d[today.getDay() + 1], st[month + '_' + date]].join(' ');

/*农历部分*/
var CalendarData = new Array(100);
var madd = new Array(12);
var tgString = "甲乙丙丁戊己庚辛壬癸";
var dzString = "子丑寅卯辰巳午未申酉戌亥";
var numString = "一二三四五六七八九十";
var monString = "正二三四五六七八九十冬腊";
var weekString = "日一二三四五六";
var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
var cYear, cMonth, cDay, TheDate;
CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
madd = new Array(0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334);

function GetBit(m, n) {
    return (m >> n) & 1;
}
function e2c() {
    TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
    var total, m, n, k;
    var isEnd = false;
    var tmp = TheDate.getYear();
    if (tmp < 1900) {
        tmp += 1900;
    }
    total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;
    if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
        total++;
    }
    for (m = 0; ; m++) {
        k = (CalendarData[m] < 0xfff) ? 11 : 12;
        for (n = k; n >= 0; n--) {
            if (total <= 29 + GetBit(CalendarData[m], n)) {
                isEnd = true; break;
            }
            total = total - 29 - GetBit(CalendarData[m], n);
        }
        if (isEnd) break;
    }
    cYear = 1921 + m;
    cMonth = k - n + 1;
    cDay = total;
    if (k == 12) {
        if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth = 1 - cMonth;
        }
        if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth--;
        }
    }
}
function GetcDateStringYear() {
    var tmp = "";
    tmp += tgString.charAt((cYear - 4) % 10);
    tmp += dzString.charAt((cYear - 4) % 12);
    tmp += "(";
    tmp += sx.charAt((cYear - 4) % 12);
    tmp += ")年 ";

    return tmp;
}

function GetcDateStringDate() {
     var tmp = "";
    if (cMonth < 1) {
        tmp += "(闰)";
        tmp += monString.charAt(-cMonth - 1);
    } else {
        tmp += monString.charAt(cMonth - 1);
    }
    tmp += "月";
    tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
    if (cDay % 10 != 0 || cDay == 10) {
        tmp += numString.charAt((cDay - 1) % 10);
    }
    return tmp;
}

function GetLunarDayYear(solarYear, solarMonth, solarDay) {
    //solarYear = solarYear<1900?(1900+solarYear):solarYear;
    if (solarYear < 1921 || solarYear > 2020) {
        return "";
    } else {
        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
        e2c(solarYear, solarMonth, solarDay);
        return GetcDateStringYear();
    }
}

function GetLunarDayDate(solarYear, solarMonth, solarDay) {
    //solarYear = solarYear<1900?(1900+solarYear):solarYear;
    if (solarYear < 1921 || solarYear > 2020) {
        return "";
    } else {
        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
        e2c(solarYear, solarMonth, solarDay);
        return GetcDateStringDate();
    }
}

var D = new Date();
var yy = D.getFullYear();
var mm = D.getMonth() + 1;
var dd = D.getDate();
var ww = D.getDay();
var ss = parseInt(D.getTime() / 1000);
if (yy < 100) yy = "19" + yy;

// document.getElementById('lunar').innerHTML = GetLunarDay(yy, mm, dd);

var _lunar = GetLunarDayYear(yy, mm, dd);
var _lunarDate = GetLunarDayDate(yy, mm, dd);

console.log(_lunar, _lunarDate)

document.getElementById('gregorian').addEventListener('mouseup', function (e) {
    var msg = prompt('记录一下今天的事情');
    if (msg) {
        if (msg == 'clearhistory') {
            window.localStorage.removeItem('msg');
        } else {
            var hmsg = window.localStorage.msg;

            var msg = _today + ': ' + msg;
            if (hmsg) {
                hmsg += `\r\n` + msg;
                window.localStorage.msg = hmsg;
            } else {
                window.localStorage.msg = msg;
            }
        }
    }
})

document.getElementById('btn-history').addEventListener('click', function () {
    var msg = window.localStorage.msg;
    if (msg) {
        alert(window.localStorage.msg)
    } else {
        alert('并没有什么记录.')
    }
})


// -----------


document.body.onload = function () {
    var clock = document.querySelector('#clock');
    var cxt = clock.getContext('2d')
    var width = clock.width = 180;
    var height = clock.height = 180;
    var r = width / 2;
    function render() {
        // canvas.save()保存当前的画布状态到栈里，canvas.restore()取出堆栈里保存的的状态，属于先进后出，
        // 所以canvas.restore()取的是最近的一次保存。
        cxt.clearRect(0, 0, width, height);
        cxt.save();
        cxt.translate(width / 2, height / 2); // 重置坐标系
        // 画轮廓
        cxt.beginPath();
        cxt.lineWidth = r * 0.05;//轮廓圆宽度
        cxt.strokeStyle = "#333";//轮廓圆颜色
        cxt.arc(0, 0, r - r * 0.05, 10 * Math.PI / 6, 4 * Math.PI / 6); //圆
        cxt.stroke();
        cxt.closePath();
        // 画内圆
        cxt.beginPath();
        cxt.lineWidth = r * 0.05;
        var radi2 = r * 0.85; //半径
        var radi3 = r * 0.55;
        cxt.arc(0, 0, radi3, 5 * Math.PI / 6, 1.5 * Math.PI); //圆
        cxt.stroke();
        cxt.closePath();
        // 画刻度 使用Math.sin(deg)、Math.cos(deg)来计算圆上点的坐标
        // 每隔6度画一个点
        var hour = [18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 19], i = 0;
        for (var deg = 0; deg < 360; deg = deg + 6) {
            var spotX = radi2 * Math.sin(deg * 2 * Math.PI / 360);
            var spotY = radi2 * Math.cos(deg * 2 * Math.PI / 360);
            var spot = r * 0.02; //刻度半径
            cxt.beginPath();
            cxt.fillStyle = "#ccc";
            if (deg % 30 == 0) {
                cxt.fillStyle = "#333";
                spot = r * 0.025;
                var textX = (radi2 * 0.85) * Math.sin(deg * 2 * Math.PI / 360); //文字x坐标
                var textY = (radi2 * 0.85) * Math.cos(deg * 2 * Math.PI / 360); //文字y坐标
                cxt.font = r * 0.1 + "px Arial";
                cxt.textBaseline = "middle";// 文字垂直对齐方式
                cxt.textAlign = "center";   // 文字水平对齐方式
                cxt.fillText(hour[i], textX, textY);
                i++;
            }
            cxt.arc(spotX, spotY, spot, 0, 2 * Math.PI);
            cxt.fill();
            cxt.closePath();
        }

        // 写入内容
        cxt.beginPath();
        cxt.fillStyle = "#000";
        cxt.font = r * 0.15 + "px Arial";
        cxt.textBaseline = "middle";// 文字垂直对齐方式
        cxt.textAlign = "center";   // 文字水平对齐方式
        cxt.fillText(_lunar, 0, r * -0.2)
        cxt.fillText(_lunarDate, 0, r * 0)
        cxt.fillText(_week, 0, r * 0.2)
        cxt.fill();
        cxt.closePath();
    }
    function drawGuid() {
        var now = new Date();
        h = now.getHours();
        m = now.getMinutes();
        s = now.getSeconds();
        drawHour(h, m);
        drawMinute(m, s);
    }
    function drawHour(h, m) {
        // 时针
        h = h + m / 60;
        cxt.save();
        cxt.beginPath();
        cxt.rotate(2 * Math.PI / 12 * h);
        cxt.lineWidth = r * 0.05;
        cxt.lineCap = "round";
        cxt.moveTo(0, -r * 0.5);
        cxt.lineTo(0, -r * 0.6);
        cxt.stroke();
        cxt.closePath();
        cxt.restore();
    }
    function drawMinute(m, s) {
        // 分针
        m = m + s / 60;
        cxt.save();
        cxt.beginPath();
        cxt.rotate(2 * Math.PI / 60 * m);
        cxt.lineWidth = 3;
        cxt.lineCap = "round";
        cxt.moveTo(0, -r * 0.5);
        cxt.lineTo(0, -r * 0.6);
        cxt.stroke();
        cxt.closePath();
        cxt.restore();
    }
    render();
    drawGuid();
    cxt.restore();
    // setInterval(function () {
    //     render();
    //     drawGuid();
    //     cxt.restore();
    // }, 30 / 1000)
}