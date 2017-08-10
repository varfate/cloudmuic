const addRipple = (e) => {
    var rippleParent = document.querySelectorAll('.ripple-effect')
    for (let i = 0; i < rippleParent.length; i++) {
        rippleParent[i].addEventListener('click', function (e) {
            var rect = this.getBoundingClientRect();
            var ripple = document.createElement('s');
            ripple.className = 'ripple';
            ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
            this.appendChild(ripple);
            ripple.classList.remove('show');
            var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
            var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
            ripple.style.top = top + 'px';
            ripple.style.left = left + 'px';
            ripple.classList.add('show');
            return false;
        })
    }
}
// 数组分组
const arrayPart = (arr, n = 3) => {
    // 判断是不是数组
    if (Object.prototype.toString.call(arr) != '[Object Array]') return null;
    let newArr = [];
    let len = arr.length;
    for (let i = 0; i < len; i += n) {
        newArr.push(arr.slice(i, i + n))
    }
    return newArr;
}

// 格式化时间
const formatDate = (ms,fmt) => {
    let dt = new Date(ms)
    var o = {
        "M+": dt.getMonth() + 1, //月份
        "d+": dt.getDate(), //日
        "h+": dt.getHours(), //小时
        "m+": dt.getMinutes(), //分
        "s+": dt.getSeconds(), //秒
        "q+": Math.floor((dt.getMonth() + 3) / 3), //季度
        "S": dt.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (dt.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
// 黑客帝国
const hacker = (canvas) => {
    let cv = canvas
    let s = window.screen
    let width = cv.width = s.width
    let height = cv.height
    let yPositions = Array(300).join(0).split('');
    let ctx = cv.getContext('2d');

    let draw = function() {
      ctx.fillStyle = 'rgba(0,0,0,.05)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = 'green';
      ctx.font = '10pt Georgia';
      yPositions.map(function(y, index) {
        let text = String.fromCharCode(1e2 + Math.random() * 33); // 随机产生字符
        let x = (index * 10) + 10;
        cv.getContext('2d').fillText(text, x, y);
        if(y > Math.random() * 1e4) {
          yPositions[index] = 0;
        } else {
          yPositions[index] = y + 10;
        }
      });
    };
    RunMatrix();

    function RunMatrix() {
      let Game_Interval = setInterval(draw, 20);
      setTimeout(function() {
        clearInterval(Game_Interval)
      },6000)

    }
}


export {
  addRipple,
  arrayPart,
  formatDate,
  hacker
}
