// 封装一个可以执行简单动画的函数
/**
 * 参数
 * obj：要执行动画的对象
 * attr: 要执行动画的样式.比如：left、top、width、height
 * target：执行动画的目标位置
 * speed：移动的速度（正数向右移动，负数向左移动）
 * callback:回调函数，这个函数将会在动画执行完毕以后执行
*/
function move(obj, attr, target, speed, callback) {
    clearInterval(obj.timer);

    var current = parseInt(getStyle(obj, attr));

    // 判断速度的正负值
    // 如果从0到800移动，则speed为正
    // 如果从800到0，则speed为负
    if (current > target) {
        speed = -speed;
    }

    // alert(oldValue);

    // 开启一个定时器，用来执行动画效果
    // 向执行动画的对象中添加一个 timer 属性，用来保存它自己的定时器的标识
    obj.timer = setInterval(function() {
        // 获取 box1 的原来的left值. 将携带 px 转换为 int
        var oldValue = parseInt(getStyle(obj, attr));

        // 在旧值的基础上增加
        var newValue = oldValue + speed;

        // 判断 newValue 是否大于 800
        // 从左移动时，需要判断newValue是否小于 target
        // 从右移动时，需要判断newValue是否打于 target
        if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
            newValue = target;
        }

        // 将新值设置给 box1
        obj.style[attr] = newValue + 'px';

        // 当元素移动到 0px 时，使其停止执行动画
        if (newValue == target) {
            // 达到目标，关闭定时器
            clearInterval(obj.timer);

            // 动画执行完毕，调用回调函数
            callback && callback();
        }
        
    }, 30)
}


function getStyle(obj, name) {
    if (window.getComputedStyle) {
        // 正常浏览器
        return getComputedStyle(obj, null)[name];
    } else {
        // IE8 浏览器
        return obj.currentStyle[name];
    }
};