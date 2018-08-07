chrome.contextMenus.create({
    'type': 'normal',
    'title': '二维码',
    'contexts': ['selection'],
    'id': 'cn',
    'onclick': translate
});

function translate(info, tab) {
    // alert(info.selectionText)
    // alert("还没写!")

    openwin(info.selectionText)
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    chrome.contextMenus.update('cn', {
        'title': '展示“' + message + '”的二维码'
    });
});



function openwin(txt) {
    var l = (screen.availWidth - 500) / 2;
    var t = (screen.availHeight - 300) / 2;
    var newWin = window.open('', '', 'width=300,height=300,top=' + t + ',left=' + l + ',toolbar=no,menubar=no,location=no,status=no');
    newWin.document.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><style>* {padding: 0;margin: 0, auto;text-align: center;}</style></head><body>')
    newWin.document.write('<div id="qr"><p>' + txt + '</p></div>')
    newWin.document.write('</body></html>')
    var qr = newWin.document.getElementById('qr');
    $(qr).qrcode({
        render: "canvas",
        width: 180,
        height: 180,
        text: toUtf8(txt)
    });
    newWin.focus()
}

// 二维码使用,charCodeAt() 输出转成utf8
function toUtf8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}
