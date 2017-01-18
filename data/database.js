(function(database){
    var mongodb = require("mongodb");
    var mongoUrl = "mongodb://localhost:27017/codingSoldierDb";
    var theDb = null;

    database.getDb = function(next) {
        if(!theDb){
            mongodb.MongoClient.connect(mongoUrl, function(error, db){
                if(error)
                    next(error, null);
                else
                {
                    theDb = {
                        db: db,
                        posts: db.collection("posts"),
                        studies: db.collection("studies"),
                        categories: db.collection("categories"),
                    };
                    next(null, theDb);
                }                
            });
        }
        else{
            next(null, theDb);
        }
    };
})(module.exports);