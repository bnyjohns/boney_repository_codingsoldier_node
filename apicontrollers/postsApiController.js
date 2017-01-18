(function(postsApiController){
    var data = require("../data");   

    postsApiController.getAllPosts = function(req, res){
        response = res;
        data.getPosts(null, responseCallBack);
    };

    postsApiController.getPostById = function(req, res){
            response = res;
            var postId = req.params.postId;
            var id = parseInt(postId);
            data.getPosts(id, responseCallBack);
    };

    var response = null;
    var responseCallBack = function(error, posts){
        if(error){
            response.send(500, error);
        }
        else{
            response.set('Content-Type', 'application/json');
            response.send(posts);
        }
    };        
})(module.exports);