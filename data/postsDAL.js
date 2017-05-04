(function(postsDAL){
    var database = require("./database");

    postsDAL.findPosts = function(pagingData){
        return database.getDb()
            .then(db => {
                return db.posts.find(null, null, pagingData).toArray(); 
            })
            .catch(err => {
                console.log(err);
            });          
    };

    postsDAL.getPostsCount = function(){
        return database.getDb()
            .then(db => {
                return db.posts.find().count();
            })
            .catch(err => {
                console.log(err);
            });              
    };    

    postsDAL.getPosts = function(id){
        return database.getDb()
            .then(db => {
                return getPosts(db,id);
            });            
    };

    let getPosts = function(db, id){
        if(!id){
            return db.posts.find().toArray();
        }
        else{
            return db.posts.findOne({ id : id });
        }
    };
        
})(module.exports);