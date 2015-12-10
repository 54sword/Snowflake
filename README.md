# snow
JavaScript 下雪效果

## 使用方法
```javascript
Snow({
    image:    'http://localhost:8888/images/snow.png', // [必选]雪花图片的绝对地址
    x:        '50px',  // [可选][默认0px]显示区域的x坐标
    y:        '85px',  // [可选][默认0px]显示区域的y坐标
    width:    '300px', // [可选][默认屏幕可见区域宽度]显示区域的宽度
    height:   "690px", // [可选][默认页面高度]显示区域的高度
    quantity: 30,      // [可选][默认20]雪花最大数量
    interval: 300,     // [可选][默认400毫秒]雪花陆续落下的间隔事件，毫秒单位
    debug:    true     // [可选]测试
});
```
