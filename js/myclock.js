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
    $("#qrcode").qrcode({
        render: "canvas",
        width: 180,
        height: 180,
        text: tab.url
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
