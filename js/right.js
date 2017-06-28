chrome.contextMenus.create({
    'type': 'normal',
    'title': '二维码',
    'contexts': ['selection'],
    'id': 'cn',
    'onclick': translate
});

function translate(info, tab) {
    alert(info.selectionText)
    alert("还没写!")
    
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    chrome.contextMenus.update('cn', {
        'title': '“' + message + '”的二维码'
    });
});

