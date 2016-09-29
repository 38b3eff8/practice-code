var Utils = {
    getMousePoint: function(element) {
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

        element.addEventListener('mouseout', function(event) {
            mouse.x = -1;
            mouse.y = -1;
        });

        return mouse;
    }
}
