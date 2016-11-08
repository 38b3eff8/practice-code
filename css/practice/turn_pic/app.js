window.onload = function () {
    var items = document.querySelectorAll('.item');
    items.forEach(function (item, index) {
        var y = -Math.floor(index / 4) * 4;
        var x = -index % 4 * 4;

        var divs = item.querySelectorAll('div');

        setStyle(divs[0], {
            'background-position': `${x}rem ${y}rem`
        });

        setStyle(divs[1], {
            'background-position': `${x}rem ${y}rem`
        });
    });

    var container = document.querySelector('.container');
    var ind = 0;
    container.addEventListener('click', function (event) {
        (function animatFunc(index) {
            if (index == 7) {
                ind = ++ind % 2;
                return;
            }

            var f = createFunc(index);
            for (var x = 0; x < 4; x++) {
                var y = f(x);
                if (y > 3 || y < 0) continue;

                var item = items[x * 4 + y];
                var divs = item.querySelectorAll('div');

                divs[ind % 2].className = 'item animat-turn'
                divs[(ind + 1) % 2].className = 'item animat-back'
            }

            setTimeout(function () {
                animatFunc(++index);
            }, 500);
        })(0);
    }, false);
}

function createFunc(a) {
    return function (x) {
        return a - x;
    }
}


function setStyle(element, css) {
    Object.keys(css).forEach(function (key) {
        element.style[key] = css[key];
    });
}