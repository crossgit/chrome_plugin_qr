
// ----------------
// 时间提示
var clock_div = document.getElementById('clock_div');
my_clock(clock_div);
// 加载缓存信息
$("#category").html(getStore());

// 二维码显示
chrome.tabs.getSelected(null, function (tab) {

    // 获取IP
    getUserIP(function (ip) {
        // document.getElementById("ip").innerHTML = 'Got your IP ! : ' + ip + " | verify in http://www.whatismypublicip.com/";
        // ' <input type="button" class="btnGetImg" value="下载二维码">'
        $("#qrcode").qrcode({
            render: "canvas",
            width: 180,
            height: 180,
            text: tab.url.replace("localhost", ip).replace("127.0.0.1", ip)
        }).append('<p style="font-size:12px;">点击二维码下载图片.</p>');

        $("#my_ip").html('ip: ' + ip);
    });

});

$(document).on('click', 'canvas', function () {
    download('qrcode.png', this, 'png');
})

// 点击生成二维码
$(".btnTrans").click(function () {
    var txt = $(".txt").val();
    if ($.trim(txt) == '') return;
    setStore(txt);
    $("#qrcode").qrcode({
        render: "canvas",
        width: 180,
        height: 180,
        text: txt
    });
})
// 清楚缓存
$('.btnClear').click(function () {
    window.localStorage.clear();
})

// 设置
function getStore() {
    if (!window.localStorage.cache) {
        return;
    }
    var _cache = window.localStorage.cache;
    var array = _cache.split(',');
    var str = '';
    for (var i = 0; i < array.length; i++) {
        str += ' <option value="' + array[i] + '">' + array[i] + '</option>'
    }
    return str;
}

function setStore(value) {
    if (window.localStorage.cache) {
        var _cache = window.localStorage.cache;
        // 最多10个,检查是否已经存在,存在不处理
        var array = _cache.split(',');
        var b = false;
        for (var i = 0; i < array.length; i++) {
            if (array[i] == value) {
                b = true;
                return;
            }
        }
        if (!b) {
            // 50个缓存
            array.unshift(value);
            if (array.length > 50) array.slice(0, 50);
            window.localStorage.cache = array.join(',');
        }
    }
    else {
        window.localStorage.cache = value;
    }

}
// 当前时间
function my_clock(el) {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds(); m = m >= 10 ? m : ('0' + m);
    s = s >= 10 ? s : ('0' + s);
    el.innerHTML = h + ":" + m + ":" + s; setTimeout(function () { my_clock(el) }, 1000);
}

/**
 * Get the user IP throught the webkitRTCPeerConnection
 * @param onNewIP {Function} listener function to expose the IP locally  获取内网IP
 * @return undefined
 */
function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
        noop = function () { },
        localIPs = {},
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
        key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

    //create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer(function (sdp) {
        sdp.sdp.split('\n').forEach(function (line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });

        pc.setLocalDescription(sdp, noop, noop);
    }, noop);

    //listen for candidate events
    pc.onicecandidate = function (ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}

// 转成图片
function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}

// 复制图片
function copyImg(dom) {
    var range = document.createRange();
    console.log(range);
    range.selectNode(dom);
    window.getSelection().addRange(range);
    document.execCommand("Copy", "false", null);
}

// 下载图片
function download(name, canvas, type) {
    //设置保存图片的类型
    var imgdata = canvas.toDataURL(type);
    //将mime-type改为image/octet-stream,强制让浏览器下载
    var fixtype = function (type) {
        type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
        var r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
    }
    imgdata = imgdata.replace(fixtype(type), 'image/octet-stream')
    //将图片保存到本地
    var saveFile = function (data, filename) {
        var link = document.createElement('a');
        link.href = data;
        link.download = filename;
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        link.dispatchEvent(event);
    }
    // var filename = new Date().toLocaleDateString() + '.' + type;
    saveFile(imgdata, name);
}