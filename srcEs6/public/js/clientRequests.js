var config = {
    server: {
        port: 4000,
        host: "localhost",
        scheme: "http://"
    }
};

function Post(path, data){
    var url = config.server.scheme + config.server.host + ":" + config.server.port + path;
    alert(data);
    jQuery.post(url, data, function(data, status){
        alert(status);
    });
}

