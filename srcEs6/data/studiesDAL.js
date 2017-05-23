import Database from './database';

let database;
class StudiesDAL{
    constructor(dataBase){
        database = dataBase;
    }
    findStudies(pagingData){
        return database.getDb()
            .then(db => {
                return db.studies.find(null, null, pagingData).toArray();
            })
            .catch(err => {
                console.log(err);
            });
    }

    getStudiesCount(){
        return database.getDb()
            .then(db => {
                return db.studies.find().count();
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export default StudiesDAL;