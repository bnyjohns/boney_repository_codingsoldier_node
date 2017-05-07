(function(postsApiController){
    var data = require("../data");   

    postsApiController.getAllPosts = function(req, res){
        data.getPosts()
            .then(function(posts){
                responseCallBack(null, posts, res);
            })
            .catch(function(err){
                responseCallBack(err, null, res);
            });     
    };

    postsApiController.getPostById = function(req, res){
            var postId = req.params.postId;
            var id = parseInt(postId);
            data.getPosts(id)
            .then(function(post){
                responseCallBack(null, post, res);
            })
            .catch(function(err){
                responseCallBack(err, null, res);
            });          
    };
    
    var responseCallBack = function(error, posts, response){
        if(error){
            response.send(500, error);
        }
        else{ 
            response.set('Content-Type', 'application/json');           
            if(!posts)                
                response.send('No Posts Found!!');                        
            else            
                response.send(posts);                         
        }
        return;
    };        
})(module.exports);