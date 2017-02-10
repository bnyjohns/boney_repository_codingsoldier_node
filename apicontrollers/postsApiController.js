(function(postsApiController){
    var data = require("../data");   

    postsApiController.getAllPosts = function(req, res){
        data.getPosts()
            .then(function(posts){
                responseCallBack(null, posts, res);
            });       
    };

    postsApiController.getPostById = function(req, res){
            response = res;
            var postId = req.params.postId;
            var id = parseInt(postId);
            data.getPosts(id, responseCallBack);
    };

    //var response = null;
    var responseCallBack = function(error, posts, response){
        if(error){
            response.send(500, error);
        }
        else{
            response.set('Content-Type', 'application/json');
            response.send(posts);
        }
        return;
    };        
})(module.exports);