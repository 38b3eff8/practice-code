function $http(url) {
    var core = {
        ajax: function(method, url, args) {
            var promise = new Promise(function(resolve, reject) {
                var client = new XMLHttpRequest();
                var uri = url;

                $.ajax({
                    method: method,
                    url: uri,
                    data: args,
                    dataType: 'json',
                    crossDomain: true,
                    success: function(data) {
                        resolve(data);
                    },
                    error: function(xhr, msg, err) {
                        reject(msg);
                    }
                });
            });
            return promise;
        }
    }

    return {
        get: function(args) {
            return core.ajax('GET', url, args);
        }
    }
};
