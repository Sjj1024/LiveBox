## 直播盒子

安安静静看直播，不要被礼物和各种诱导消费迷惑，冷静冷静冷静，商品和礼物也不一定非买不可，静静地看人生百态不也是一种享受。软件原理学习研究相关文章我已发布到我的博客上面，欢迎参观我的博客：  
[CSDN 博客：](https://blog.csdn.net/weixin_44786530?spm=1000.2115.3001.5343) https://blog.csdn.net/weixin_44786530?spm=1000.2115.3001.5343

[掘金博客：](https://juejin.cn/user/70007368988926)https://juejin.cn/user/70007368988926

## 功能介绍

可以获取直播视频和主播头像和昵称，直播聊天弹幕内容，但是屏蔽刷礼物功能，禁止刷礼物禁止消费，理性看播，看紧口袋。
windows/mac/linux 下载地址：https://github.com/Sjj1024/LiveBox/releases

下载说明：
![alt text](./analysis/down.png)

## 常见问题

mac 电脑提示：已损坏,无法打开,你应该将它移到废纸篓，执行下面这条命名即可解决：

```
sudo xattr -r -d com.apple.quarantine /Applications/LiveBox.app
```

## 编译操作

打 tag 发布到 github 的 action 打包全平台的安装程序。
例如：

```
git tag v1.0.0
git push --tag

查看tag:
git tag

删除tag:
git tag -d v1.0.0
git push --delete origin v1.0.0
```

## 界面介绍

![alt text](./analysis/image-6.png)
![alt text](./analysis/image-7.png)

## 赞助

开源不易, 有了您的赞助, 我们会做的更好~
![alt text](./analysis/pay.png)

## TODO

1. 增加登录功能, 一个窗口登录，其他窗口免登录
