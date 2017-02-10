(function(postsDAL){
    var database = require("./database");

    postsDAL.findPosts = function(pagingData){
        return database.getDb()
            .then(function(db){
                return findPosts(db, pagingData);
            });
    };

    function findPosts(db, pagingData){
        return db.posts.find(null, null, pagingData).toArray()
            .then(function(posts){
                return posts;
            });
    }

    postsDAL.getPostsCount = function(){
        return database.getDb()
                .then(getPostsCount);
    };

    function getPostsCount(db){
        return db.posts.find().count()
            .then(function(count){
                return count;
            })
            .catch(function(err){
                consolo.log(err);
            });
    }

    postsDAL.getPosts = function(id){
        return database.getDb()
            .then(function(db){
                if(!id){
                    return db.posts.find().toArray()
                        .then(function(posts){
                            return posts;
                        });
                }
                else{
                    return db.posts.findOne({ id : id })
                        .then(function(post){
                            return post;
                        })
                }
            });        
    };
})(module.exports);