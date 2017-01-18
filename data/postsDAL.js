(function(postsDAL){
    var database = require("./database");

    postsDAL.findPosts = function(pagingData, next){
        database.getDb(function(error, db){
            if(error){
                next(error, null);
            }
            else{
                db.posts.find(null, null, pagingData).toArray(next);        
            }
        });
    };

    postsDAL.getPostsCount = function(next){
        database.getDb(function(error, db){
        if(error){
            next(error, null);
        }
        else{
            db.posts.find().count(next);
        }
        });
    };

    postsDAL.getPosts = function(id, next){
        database.getDb(function(error, db){
        if(error){
            next(error, null);
        }
        else{
            var posts = null;
            if(!id){
            db.posts.find().toArray(next);
            }
            else{
            db.posts.findOne({ id : id }, next);
            }        
        }   
        });
    }; 

})(module.exports);