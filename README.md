## chrome插件

> 下载后,直接加载就好

打开chrome,在设置里打开`扩展程序`-`加载扩展程序`,找到路径,直接选择加载就看到了.

> 使用

打开一个网页,就会显示出该网址的二维码.

> 遗留问题: 

* 选择内容后,右键功能还没做.


> 使用技巧

* 开发环境http://localhost/xxx改成内网IP

打开 js/myclock.js,修改20行的IP地址

    text: tab.url.replace("localhost","192.168.1.100")