function my_clock(el) {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds(); m = m >= 10 ? m : ('0' + m);
    s = s >= 10 ? s : ('0' + s);
    el.innerHTML = h + ":" + m + ":" + s; setTimeout(function () { my_clock(el) }, 1000);
}

// 时间提示
var clock_div = document.getElementById('clock_div');
my_clock(clock_div);

// 二维码显示
chrome.tabs.getSelected(null, function (tab) {
    // 获取IP
    getUserIP(function (ip) {
        // document.getElementById("ip").innerHTML = 'Got your IP ! : ' + ip + " | verify in http://www.whatismypublicip.com/";
        $("#qrcode").qrcode({
            render: "canvas",
            width: 180,
            height: 180,
            text: tab.url.replace("localhost", ip)
        });
    });

});


$(".btnTrans").click(function () {
    var txt = $(".txt").val();
    $("#qrcode").qrcode({
        render: "canvas",
        width: 180,
        height: 180,
        text: txt
    });
})


/**
 * Get the user IP throught the webkitRTCPeerConnection
 * @param onNewIP {Function} listener function to expose the IP locally
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