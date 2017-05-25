## ImageView() 仿微信图片查看方法是用
----------------
> 仿微信图片交互，支持pc端html5版本，支持移动端横竖屏切换，支持屏幕自适应。
>* 首先实例化对象，var myExtend = new MyNeedExtend();
>* 然后实例化对象里面的ImageView()构造函数，new myExtend.ImageView()
>* 最后调用它的init()方法，里面需要传3个值(设备类型，dom对象，图片数组)
>>1. 设备类型的值可以是 pc phone pad
>>2. 第二个值需要是获取的原生dom对象传入
>>3. 第三个值是数组，例子[{src:"images/img.jpg"},{src:"images/img2.jpg"},...]

## DivImageView() 仿微信图片查看方法是用
----------------
> 针对ImageView一个扩展，可以在图片上放置额外内容。
> 缺点，只能一次处理一张图片
>* 首先实例化对象，var myExtend = new MyNeedExtend();
>* 然后实例化对象里面的ImageView()构造函数，var div = new myExtend.DivImageView();
>* 最后调用它的div.init()方法，里面需要传3个值(设备类型，dom对象，图片相关)
> 案例配置如下：
```
  {
        src: "./image/map.jpg",//平面地图背景地图地址
        data: [
            {
                sceneId: "v1",
                pan: "153",
                tilt: "220",
                title: "第一个",
                icon: {
                    src: "http://static.oschina.net/uploads/space/2014/0820/112808_PWns_1187419.png",//图标地址
                    width: "30",//图标宽度
                    height: "30",//图标高度
                    offsetWidth: "-15",//地理位置距离图标左上角的宽度
                    offsetHeight: "-15",//地理位置距离图标左上角的高度
                    imageOffsetWidth: "0",//图片向左偏移量
                    imageOffsetHeight: "0"//图片向上的偏移量
                }
            },
            ...
        ]
    }
```
> 里面扩展了三个方法div.initMore(dom)（内容添加完成后的回调），div.scaleCallback(dom)（缩放时的回调），div.touchendCallback(dom)（交互完成时的回调）
> 在方法里面返回的dom就是创建的dom元素，根据dom对象获取相关信息。

