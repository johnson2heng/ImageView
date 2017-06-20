# ImageView() 仿微信图片查看方法
----------------
> 仿微信图片交互，支持pc端html5版本，支持移动端横竖屏切换，支持屏幕自适应。
>* 首先实例化对象，var myExtend = new MyNeedExtend();
>* 然后实例化对象里面的ImageView()构造函数，new myExtend.ImageView()
>* 最后调用它的init()方法，里面需要传3个值(设备类型，dom对象，图片数组)
>>1. 设备类型的值可以是 pc phone pad
>>2. 第二个值需要是获取的原生dom对象传入
>>3. 第三个值是数组，例子[{src:"images/img.jpg"},{src:"images/img2.jpg"},...]

# DivImageView() 仿微信图片查看方法
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

# MyNeedExtend.prototype.touch() 兼容全端的交互事件
-----------------------
>兼容：兼容ie9+和移动端大部分版本，由于没有时间测试，希望大家使用完后给点意见。
>使用：
>首先实例化方法的对象，并且赋值变量
```
var myExtend = new MyNeedExtend();
```
>然后使用myExtend.touch()方法获取到绑定交互对象。
```
var dom = myExtend.touch(document.getElementById("div"));//通过获取到相关dom的对象
```
touch()函数内可以传入的值，dom对象，一个数组dom对象，jq对象。
>绑定事件，使用on方法绑定事件
```
    dom.on("tap",function () {
        console.log("tap");
    });
```
>支持的方法：tap（点击事件），singleTap（一次点击事件，如果触发双击，此事件不会触发），doubleTap（双击事件），swipe（滑动事件），longTap（长按事件），swipeLeft（左划事件），swipeRight（右划事件），swipeUp（上划事件），swipeDown（下划事件），wheel（鼠标滚动事件，pc端）
>pc端的滚动事件可以传入两个function，第一个为往下滚动，第二个为往上滚动。

