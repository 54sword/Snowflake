/*

Snow({
  img: 'http://localhost:8888/images/snow.png',
  y: '85px',
  x: '50px',
  width: '300px',
  height: "690px",
  quantity: 30,
  interval: 300,
  debug: true
});

*/



/*

url
hp
speed
cos

 */

var Snow = function(config) {

  var debug = config.debug || false;

  // 雪
  var winter = [];

  // 雪显示的范围
  var rect = { x: 0, y: 0, width: 0, height: 0 };

  // 雪的最大数量
  var snowQuantity = config.quantity || 20;

  var snowSize = config.snowSize || 20;

  var interval = config.interval || 400;

  var image = config.image;

  var snow = (function() {

    var $winter = document.createElement("div");

    $winter.style.position = "absolute";

    $winter.style.top = config.y ? config.y: '0px';
    $winter.style.left = config.x ? config.x: '0px';

    $winter.style.width = config.width ? config.width : document.body.offsetWidth - parseInt($winter.style.left) + 'px';
    $winter.style.height = config.height ? config.height : document.body.offsetHeight - parseInt($winter.style.top) + 'px';

    $winter.style.pointerEvents = 'none';

    if (debug) {
      $winter.style.backgroundColor = 'rgba(0,0,0,0.6)';
    } else {
      $winter.style.overflow = 'hidden';
    }

    rect.x = parseInt($winter.style.top);
    rect.y = parseInt($winter.style.left);
    rect.width = parseInt($winter.style.width);
    rect.height = parseInt($winter.style.height);

    document.body.appendChild($winter);

    return function(x, y, width, height) {

      this.x = x || 0;
      this.y = y || 0;
      this.width = width || 20;
      this.height = height || 20;

      this.y = this.y - this.height;

      var div = document.createElement("div");
      div.className = 'snow';
      div.style.width = this.width + 'px';
      div.style.height = this.height + 'px';
      div.style.marginTop = this.y + 'px';
      div.style.marginLeft = this.x + 'px';

      this.div = div;

      $winter.appendChild(div);

      this.speed = Math.floor(Math.random()*3+1);
      this.cos = Math.floor(Math.random()*100+16);

      this.update = function() {

        this.y = this.y + this.speed;
        this.div.style.marginTop = this.y + 'px';

        this.x = this.x + Math.cos(this.y/this.cos);

        this.div.style.marginLeft = this.x + 'px';

        this.div.style.opacity = 1 - this.y/rect.height;
      };

      this.move = function() {
      };

      this.melt = function() {
        var parent = this.div.parentNode;
        parent.removeChild(this.div);
      };
    }

  }());

  var falling = function() {

    var i = winter.length;

    while(i--) {

      if (!winter[i]) { continue; }

      var snow = winter[i];

      if ( snow.y - snow.height >= rect.height ) {
        snow.melt();
        winter.splice(i, 1);
      } else {
        snow.update();
      }

    }
  };

  var timer = function(){
    setTimeout(function(){
      falling();
      timer();
    }, 1000/60);
  };

  var createSnow = function() {

    if (winter.length < snowQuantity) {
      var size = Math.floor(Math.random()*snowSize+snowSize/2);
      var x = Math.floor(Math.random()*rect.width - size +0);

      winter.push(new snow(x, 0, size, size));
    }

    setTimeout(function(){
      createSnow();
    }, interval);

  };

  timer();
  createSnow();


  // http://www.cnblogs.com/2050/p/4029656.html
  function addCSS(cssText) {
    var style = document.createElement('style'),  //创建一个style元素
      head = document.head || document.getElementsByTagName('head')[0]; //获取head元素
      style.type = 'text/css'; //这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用

    if (style.styleSheet) { //IE
      var func = function() {
        try{ //防止IE中stylesheet数量超过限制而发生错误
          style.styleSheet.cssText = cssText;
        } catch(e) {
        }
      }
      //如果当前styleSheet还不能用，则放到异步中则行
      if (style.styleSheet.disabled) {
        setTimeout(func, 10);
      } else {
        func();
      }
    } else { //w3c
      //w3c浏览器中只要创建文本节点插入到style元素中就行了
      var textNode = document.createTextNode(cssText);
      style.appendChild(textNode);
    }
    head.appendChild(style); //把创建的style元素插入到head中
  };

  var css = '.snow{'+
    'background-image: url('+image+');'+
    'background-repeat: no-repeat;'+
    'position: absolute;'+
    'background-size:100% 100%;'+
    'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='+image+',  sizingMethod=\'scale\');'+
    'animation-name: spin;'+
    'animation-duration: 4000ms;'+
    'animation-iteration-count: infinite;'+
    'animation-timing-function: linear;'+
  '}'+
  '@keyframes spin {'+
    'from { transform: rotate(0deg); }'+
    'to { transform: rotate(360deg); }'+
  '}';

  addCSS(css);

};
