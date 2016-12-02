function ScrollList(selector, data = null, renderCount = 40, renderStart = 0) {
    this.data = data || []
    this.renderCount = renderCount
    this.renderStart = renderStart

    this.root = document.querySelector(selector)

    this.visualElement = this.root.querySelector('.visiable')
    this.topElement = this.root.querySelector('.top')
    this.bottomElement = this.root.querySelector('.bottom')

    this.render()
    this.itemHeight = document.querySelector('.item').offsetHeight

    var body = document.querySelector('body')
    var screenHeight = window.screen.availHeight

    var self = this
    document.addEventListener('scroll', (event) => {
        let scrollTop = body.scrollTop
        let offsetHeight = body.offsetHeight



        if (scrollTop > (self.renderStart + self.renderCount - 5) * this.itemHeight - screenHeight) {
            if (self.renderStart + self.renderCount >= self.data.length)
                return
            self.renderStart += self.renderCount / 2
            self.render()
        } else if (scrollTop < ((self.renderStart + 5) * this.itemHeight)) {
            if (self.renderStart === 0)
                return
            self.renderStart -= self.renderCount / 2
            self.render()
        }
    }, true)
}

ScrollList.prototype.render = function () {
    let renderEnd = (this.renderStart + this.renderCount) < this.data.length ? (this.renderStart + this.renderCount) : data.length
    this.visualElement.innerHTML = ''
    for (let index = this.renderStart; index < renderEnd; index++) {
        this.visualElement.innerHTML += `<div class="item">Item ${index}</div>`
    }

    let item = document.querySelector('.item')
    let itemHeight = this.itemHeight

    this.topElement.style.height = itemHeight * this.renderStart + 'px'
    this.bottomElement.style.height = (this.data.length - renderEnd) * itemHeight + 'px'
}