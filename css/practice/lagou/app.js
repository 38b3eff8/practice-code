window.onload = function () {
    var blocks = document.querySelectorAll('.block')

    var beforePoint = [0, 0];

    blocks.forEach(function (block) {
        var floatItem = block.querySelector('.float-item')
        var time = '300ms ease forwards'

        block.addEventListener('mouseover', moveIn, false)
        block.addEventListener('mouseout', moveOut, true)

        function moveIn(event) {
            var direct = getFrom(block, event)
            if (!direct) return
            console.log(direct)
            var css = {}
            switch (direct) {
                case 'fromUp':
                    css = {
                        animation: 'fromUp ' + time
                    }
                    break
                case 'fromRight':
                    css = {
                        animation: 'fromRight ' + time
                    }
                    break
                case 'fromDown':
                    css = {
                        animation: 'fromDown ' + time
                    }
                    break
                case 'fromLeft':
                    css = {
                        animation: 'fromLeft ' + time
                    }
                    break
            }

            setStyle(floatItem, css)

            // setStyle(floatItem, {
            //     top: 0,
            //     left: 0,
            //     transition: 'all 300ms ease'
            // })
        }

        function moveOut(event) {
            var direct = getLeave(block, event)
            if (!direct) return
            console.log(direct)

            var css = {}
            switch (direct) {
                case 'leaveUp':
                    setStyle(floatItem, {
                        animation: 'leaveUp ' + time
                    })
                    break
                case 'leaveRight':
                    setStyle(floatItem, {
                        animation: 'leaveRight ' + time
                    })
                    break
                case 'leaveDown':
                    setStyle(floatItem, {
                        animation: 'leaveDown ' + time
                    })
                    break
                case 'leaveLeft':
                    setStyle(floatItem, {
                        animation: 'leaveLeft ' + time
                    })
                    break
            }

            setStyle(floatItem, css)
        }
    })




    document.addEventListener('mousemove', function (event) {
        var x = event.clientX
        var y = event.clientY

        beforePoint[0] = x;
        beforePoint[1] = y;
    })

    function getFrom(block, event) {
        var x = beforePoint[0], y = beforePoint[1]

        if (x >= block.offsetLeft && x <= block.offsetLeft + block.offsetWidth) {
            if (y <= block.offsetTop) {
                return 'fromUp'
            } else if (y >= block.offsetTop + block.offsetHeight) {
                return 'fromDown'
            }
        } else {
            if (x <= block.offsetLeft) {
                return 'fromLeft'
            } else if (x >= block.offsetLeft + block.offsetWidth) {
                return 'fromRight'
            }
        }
    }

    function getLeave(block, event) {
        var x = event.clientX, y = event.clientY

        if (x >= block.offsetLeft && x <= block.offsetLeft + block.offsetWidth) {
            if (y <= block.offsetTop) {
                return 'leaveUp'
            } else if (y >= block.offsetTop + block.offsetHeight) {
                return 'leaveDown'
            }
        } else {
            if (x <= block.offsetLeft) {
                return 'leaveLeft'
            } else if (x >= block.offsetLeft + block.offsetWidth) {
                return 'leaveRight'
            }
        }
    }
}

function setStyle(element, css) {
    Object.keys(css).forEach(function (key) {
        element.style[key] = css[key];
    });
}