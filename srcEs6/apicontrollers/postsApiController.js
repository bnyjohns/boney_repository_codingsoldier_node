let data;
let responseCallBack = function(error, posts, response){
    try{
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
    }
    catch(e){
        console.log(e);
    }    
    return;
};

class PostsApiController{
    constructor(_data){
        data = _data;
    }
    
    getAllPosts(req, res){
        return data.getPosts()
            .then(function(posts){    
                console.log('inside this');             
                responseCallBack(null, posts, res);    
                console.log('inside then');            
            })
            .catch(function(err){
                responseCallBack(err, null, res);
            });     
    }

    getPostById(req, res){
            var postId = req.params.postId;
            var id = parseInt(postId);
            data.getPosts(id)
            .then(function(post){
                responseCallBack(null, post, res);
            })
            .catch(function(err){
                responseCallBack(err, null, res);
            });          
    }
}

export default PostsApiController;