window.utils = {
    containsPoint: function(rect, x, y) {
        return !(x < rect.x || x > rect.x + rect.width || y < rect.y || y > rect.y + rect.height);
    },
    captureMouse: function(element) {
        var mouse = {
            x: 0,
            y: 0
        };

        element.addEventListener('mousemove', function(event) {
            var x, y;
            if (event.pageX || event.pageY) {
                x = event.pageX;
                y = event.pageY;
            } else {
                x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }

            x -= element.offsetLeft;
            y -= element.offsetTop;

            mouse.x = x;
            mouse.y = y;
        }, false);
        return mouse;
    },
    captureTouch: function(element) {
        var touch = {
            x: null,
            y: null,
            isPressed: false,
            event: null
        };

        var body_scrollLeft = document.body.scrollLeft,
            element_scrollLeft = document.documentElement.scrollLeft,
            body_scrollTop = document.body.scrollTop,
            element_scrollTop = document.documentElement.scrollTop,
            offsetLeft = element.offsetLeft,
            offsetTop = element.offsetTop;

        element.addEventListener('touchstart', function(event) {
            touch.isPressed = true;
            touch.event = event;
        }, false);

        element.addEventListener('touchend', function(event) {
            touch.isPressed = false;
            touch.event = null;
            touch.x = null;
            touch.y = null;
        }, false);

        element.addEventListener('touchmove', function(event) {
            var x, y, touch_event = event.touches[0];

            if (touch_event.pageX || touch_event.pageY) {
                x = touch_event.pageX;
                y = touch_event.pageY;
            } else {
                x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
                y = touch_event.clientY + body_scrollTop + element_scrollTop;
            }

            x -= offsetLeft;
            y -= offsetTop;

            touch.x = x;
            touch.y = y;
            touch.event = event;
        }, false);
        return touch;
    },
    parseColor: function(color, toNumber) {
        if (toNumber === true) {
            if (typeof color === 'number') {
                return (color | 0); //chop off decimal
            }
            if (typeof color === 'string' && color[0] === '#') {
                color = color.slice(1);
            }
            return window.parseInt(color, 16);
        } else {
            if (typeof color === 'number') {
                color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //pad
            }
            return color;
        }
    }
};

//动画循环
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(callback) {
            return window.setTimeout(callback, 17 /*~ 1000/60*/ );
        });
}

//动画循环取消
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
        window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
        window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
        window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
        window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
        window.clearTimeout);
}
