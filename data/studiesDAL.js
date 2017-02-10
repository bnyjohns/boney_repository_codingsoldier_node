(function(studiesDAL){
    var database = require("./database");
    
    studiesDAL.findStudies = function(pagingData){
        return database.getDb()
                .then(function(db){
                    return findStudies(db, pagingData);
                });
    };    

    studiesDAL.getStudiesCount = function(){
        return database.getDb()
                .then(getStudiesCount);        
    };

    function findStudies(db, pagingData){
        return db.studies.find(null, null, pagingData).toArray()
                .then(function(studies){
                    return studies;
                })
                .catch(function(err){
                    console.log(err);
                });
    }

    function getStudiesCount(db){
        return db.studies.find().count()
                .then(function(count){
                    return count;
                })
                .catch(function(err){
                    console.log(err);
                });
    }

})(module.exports);