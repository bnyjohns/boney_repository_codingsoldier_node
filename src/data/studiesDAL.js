(function(studiesDAL){
    var database = require("./database");

    studiesDAL.findStudies = function(pagingData){
        return database.getDb()
            .then(db => {
                return db.studies.find(null, null, pagingData).toArray();
            })
            .catch(err => {
                console.log(err);
            });
    };

    studiesDAL.getStudiesCount = function(){
        return database.getDb()
            .then(db => {
                return db.studies.find().count();
            })
            .catch(err => {
                console.log(err);
            });
    };
    
})(module.exports);