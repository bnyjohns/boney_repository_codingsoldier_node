import Database from './database';

let getPostsPrivate = function(db, id){
        if(!id){
            return db.posts.find().toArray();
        }
        else{
            return db.posts.findOne({ id : id });
        }
}
let database;

class PostsDAL{    
    constructor(dataBase){
        database = dataBase;
    }

    findPosts(pagingData){
        return database.getDb()
            .then(db => {
                return db.posts.find(null, null, pagingData).toArray(); 
            })
            .catch(err => {
                console.log(err);
            });
    }

    getPostsCount(){
        return database.getDb()
            .then(db => {
                return db.posts.find().count();
            })
            .catch(err => {
                console.log(err);
            });              
    }

    getPosts(id){
        return database.getDb()
            .then(db => {
                return getPostsPrivate(db,id);
            });            
    }    
}

export default PostsDAL;
