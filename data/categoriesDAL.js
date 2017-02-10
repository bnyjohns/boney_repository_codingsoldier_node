(function(categoriesDAL){    
    var database = require("./database");

    categoriesDAL.getCategories = function(){
        return database.getDb()
            .then(function(db){
                db.categories.find().toArray()
                .then(function(categories){
                    return categories;
                });
            })
            .catch(function(err){
                console.log(err);
            });        
    };
})(module.exports);

