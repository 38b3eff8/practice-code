var FileUpload = function (file, dispaly) {
    this.file = file;

    this.chunkSize = 1024 * 1024 * 10;

    if (dispaly)
        this.dispaly = document.querySelector(dispaly);
    else
        this.dispaly = null;

    this.status = Array.from({ length: this.getCount() }).map(() => 0);
}

FileUpload.prototype.getCount = function () {
    return Math.ceil(this.file.size / this.chunkSize);
}

FileUpload.prototype.upload = function () {
    var reader = new FileReader();
    var self = this;
    reader.addEventListener('load', function (event) {
        for (var i = 0; i < self.getCount(); i++) {
            (function (index) {
                var start = index * self.chunkSize;
                var end = (index + 1) * self.chunkSize - 1;
                var buffer = reader.result.slice(start, end);

                self.sendBlock(index, buffer);
            } (i));
        }
    }, false);
    reader.readAsArrayBuffer(this.file);
}

FileUpload.prototype.sendBlock = function (index, buffer) {
    var data = {
        index: index,
        filename: this.file.name,
        count: this.getCount()
    };

    var formData = new FormData();
    formData.append('json', JSON.stringify(data));
    formData.append('data', new Blob([buffer]));
    var self = this;
    function success() {
        self.status[index] = 1;

        self.render();

        if (self.isSendFinally()) {

        }
    }
    function error() {
        Send('http://localhost:5000', 'POST', formData, success, error);
    }
    Send('http://localhost:5000', 'POST', formData, success, error);
}

FileUpload.prototype.isSendFinally = function () {
    return this.status.filter((value) => value == 0).length == 0
}

FileUpload.prototype.render = function () {
    if (!this.dispaly) return;

    var ht = '';
    for (var i = 0; i < this.status.length; i++) {
        if (this.status[i] == 1)
            ht += '<div class="block ok"></div>';
        else
            ht += '<div class="block"></div>';
    }

    this.dispaly.innerHTML = ht;
}

var Send = function (url, method, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200)
                success(this.responseText)
            else
                error();
        }
    }

    xhr.open(method, url);
    if (method === 'POST')
        xhr.send(data);
    else
        xhr.send();
}