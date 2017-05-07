import mongodb from 'mongodb';
import errorHandler from '../core/errorHandler';

let theDb;
class Database{
    constructor(){
        this._mongoUrl = "mongodb://localhost:27017/codingSoldierDb";        
    }

    getDb(){
        if(theDb){
            return Promise.resolve(theDb);
        }
        else{
            return mongodb.MongoClient.connect(this._mongoUrl)
                    .then(populateDb)
                    .catch(errorHandler.logError);
        }
    }
}
export default Database;

let populateDb = function(db){
    theDb = {
                db: db,
                posts: db.collection("posts"),
                studies: db.collection("studies"),
                categories: db.collection("categories"),
            };  
    return theDb;
};