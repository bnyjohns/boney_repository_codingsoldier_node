(function(categoriesDAL){    
    var database = require("./database");

    categoriesDAL.getCategories = function(next){
        database.getDb(function(error, db){
            if(error){
                next(error, null);
            }
            else{
                db.categories.find().toArray(next);
            }
        });
    };
})(module.exports);

