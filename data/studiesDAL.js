(function(studiesDAL){
    var database = require("./database");
    
    studiesDAL.findStudies = function(pagingData, next){
        database.getDb(function(error, db){
            if(error){
                next(error, null);
            }
            else{
                db.studies.find(null, null, pagingData).toArray(next);        
            }
        });
    };

    studiesDAL.getStudiesCount = function(next){
        database.getDb(function(error, db){
            if(error){
                next(error, null);
            }
            else{
                db.studies.find().count(next);
            }
        });
    };

})(module.exports);