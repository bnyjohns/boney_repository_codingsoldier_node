(function(database1){
    var mongodb = require("mongodb");
    var errorHandler = require('../core/errorHandler');
    var mongoUrl = "mongodb://localhost:27017/codingSoldierDb";
    var theDb = null;    

    var populateDb = function(db){
        return {
                    db: db,
                    posts: db.collection("posts"),
                    studies: db.collection("studies"),
                    categories: db.collection("categories"),
                };        
    };

    database1.getDb = function() {
        if(theDb)
            return Promise.resolve(theDb);
        else{
            return mongodb.MongoClient.connect(mongoUrl)
                    .then(populateDb)
                    .catch(errorHandler.logError);
        }
    };    
})(module.exports);