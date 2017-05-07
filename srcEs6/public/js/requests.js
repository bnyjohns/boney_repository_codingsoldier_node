(function(requests){
    var querystring = require('querystring');
    var http = require('http');
    var config = require('./config');

    requests.PostRequest = function(requestObject, pathToPost) {    
        // Build the post string from an object
        var post_data = querystring.stringify(requestObject);

        // An object of options to indicate where to post to
        var post_options = {
            host: config.server.host,
            port: config.server.port,
            path: pathToPost,      
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(post_data)
            }
        };

        // Set up the request
        var post_req = http.request(post_options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('Response: ' + chunk);
            });
        });

        // post the data
        post_req.write(post_data);
        post_req.end();
    }

    requests.GetRequest = function(requestObject, pathToPost) {

    }

})(module.exports);
