# 使用介绍
## datatables-强化表格操作
```
<head>
    <link rel="stylesheet" href="/static/css/jquery/datatables.min.css">
    <script type="application/javascript" src="/static/js/jquery/datatables.min.js"></script>
</head>
<body>
    <script type="application/javascript">
        $(document).ready(function (){
            $('#myTable').DataTable();
        });
	</script>
</body>
```

## fingerprintjs-客户端指纹生成
```
<head>
    <script async type="application/javascript" src="/static/js/fingerprintjs.min.js" onload="getId()"></script>
</head>
<body>
    <div>112233</div>
    <script type="application/javascript">
        function getId() {
            const fpPromise = FingerprintJS.load();
            fpPromise.then(fp => fp.get())
                     .then(result => {
                         const visitorId = result.visitorId
                         console.log(visitorId)
                    });
        }
    </script>
</body>
```

## lazyload-图片延迟载入
```
<head>
    <script type="application/javascript" src="/static/js/lazyload.min.js"></script>
</head>
<body>
    <div>
        <!-- 默认情况下插件假定可以在data-src属性中找到原始高分辨率图像的URL,还可以在src属性中包括可选的低分辨率占位符 -->
        <img class="lazyload" data-src="img/example.jpg" width="765" height="574">
        <img class="lazyload" src="img/example-thumb.jpg" data-src="img/example.jpg" width="765" height="574">
    </div>
    <script type="application/javascript">
        $(document).ready(function (){
            lazyload();
        });
    </script>
</body>
```

## lightslider-轻量且响应式的跑马灯/幻灯片
```
<head>
    <link rel="stylesheet" href="/static/css/jquery/lightslider.min.css">
    <script type="application/javascript" src="/static/js/jquery/lightslider.min.js"></script>
</head>
<body>
    <div>
        <ul id="lightSlider">
            <li>
                <h3>First Slide</h3>
                <p>Lorem ipsum Cupidatat quis pariatur anim.</p>
            </li>
            <li>
                <h3>Second Slide</h3>
                <p>Lorem ipsum Excepteur amet adipisicing fugiat velit nisi.</p>
            </li>
        </ul>
    </div>
    <script type="application/javascript">
        $(document).ready(function (){
            $("#lightSlider").lightSlider({
                slideWidth: 270,
                //宽度
                slideMargin: 0,
                //间距
                slideMove: 1,
                //一次滚动1张
                minSlide: 1,
                //最少显示一张
                maxSlide: 8,
                //最大显示8张
                pager: true,
                //分页
                controls: true,
                //显示按钮
                prevHtml: '',
                //上一张按钮html内容
                nextHtml: '',
                //下一张按钮html内容
                keyPress: true,
                //支持键盘操作
                thumbWidth: 50,
                //缩略图宽
                thumbMargin: 3,
                //缩略图间距
                gallery: false,
                //是否使用画廊
                currentPagerPosition: 'middle',
                //当前页显示的方式
                useCSS: true,
                //是否使用CSS样式
                auto: false,
                //是否自动播放
                pause: 2000,
                //播放的间隔时间
                loop: true,
                //是否循环播入
                easing: '',
                //使用的动画效果
                speed: 1000,
                //动画时间
                mode: "slide",
                //使用的模式
                swipeThreshold: 10,
                动画缓冲阀值
                onBeforeStart: function() {},
                //初始前执行的函数
                onSliderLoad: function() {},
                //加载时执行的函数
                onBefroreSlide: function() {},
                //滚动开始前执行的函数
                onAfterSlide: function() {},
                //滚动开始后执行的函数
                onBeforeNextSlide: function() {},
                //下一滚动时执行的函数
                onBeforePrevSlide: function() {} //上一帧动画时执行的函数
            });
        });
	</script>
</body>
```

## alertify-美化通知信息
官网 https://alertifyjs.com/

## pickadate-日期/时间选择器
官网 https://www.pickadatejs.cn/

## validation-jquery表单数据检查
教程 http://www.360doc.com/content/17/0726/06/2708086_674167741.shtml

## moment-日期处理
官网 http://momentjs.cn/

## ace-在线代码编辑器
CDN https://pagecdn.com/lib/ace
官网 https://ace.c9.io/
教程 https://baijiahao.baidu.com/s?id=1688678762431244731&wfr=spider&for=pc

## pdf-PDF文件在线操作
教程 https://www.jianshu.com/p/9cd4840f9323

## three-3D渲染
文档 https://techbrood.com/threejs/docs/

## video-HTML5视频播放器
教程 https://blog.csdn.net/a0405221/article/details/80923090

## leafletjs-开源互动地图
官网 https://leafletjs.com/
