import SeedPosts from './seedData/seedPosts';
import SeedStudies from './seedData/seedStudies';
import SeedCategories from './seedData/seedCategories';
// import Database from './database';
// import PostsDAL from './postsDAL';
// import CategoriesDAL from './categoriesDAL';
// import StudiesDAL from './studiesDAL';
// import ErrorHandler from '../core/errorHandler';
//import DiContainer from '../core/diContainer';

let seedPosts, seedStudies, seedCategories, database, postsDAL, categoriesDAL, studiesDAL, errorHandler;

class Data{
    constructor(_dataBase, _postsDAL, _categoriesDAL, _studiesDAL, _errorHandler){ 
        console.log('Inside Data Constructor');    
        database = _dataBase;
        postsDAL = _postsDAL;
        categoriesDAL = _categoriesDAL;
        studiesDAL = _studiesDAL;
        errorHandler = _errorHandler;
    }

    static seed(){
        seedDatabase();
    }

    getPostsCount(){
        return postsDAL.getPostsCount();
    }

    findPosts(pagingData){
        return postsDAL.findPosts(pagingData);
    } 

    getPosts(id){
        return postsDAL.getPosts(id);
    }

    getStudiesCount(){
        return studiesDAL.getStudiesCount();
    }

    findStudies(pagingData){
        return studiesDAL.findStudies(pagingData);
    }

    getCategories(){
        return categoriesDAL.getCategories();
    }
}

export default Data;

let seedDatabase = function(){
      database.getDb()
      .then(db => {      
          seedPostsToDatabase(db);
          seedStudiesToDatabase(db);
          seedCategoriesToDatabase(db);
      })
      .catch(err => {
          console.log("Failed to connect to DB while attempting to seed");
      });    
};

let insertSeedDataIntoDb = function(seedData,dbData){
    seedData.forEach(item => {
        dbData.insert(item, err => {
          if(err){
            console.log("Error inserting item into Db");
          }
        });
    });
};

let seedPostsToDatabase = function(db){
    seedPosts = new SeedPosts();
    db.posts.deleteMany({});
    db.posts.count()
    .then(count =>{
      if(count === 0)
        insertSeedDataIntoDb(seedPosts.initialPosts(), db.posts);      
      else
        console.log("Posts already seeded");      
    })
    .catch(errorHandler.logError);    
};

let seedStudiesToDatabase = function(db){
    seedStudies = new SeedStudies();
    db.studies.deleteMany({});
    db.studies.count()
    .then(count =>{
      if(count === 0)
        insertSeedDataIntoDb(seedStudies.initialStudies(), db.studies);      
      else
        console.log("Studies already seeded");      
    })
    .catch(errorHandler.logError);    
};

let seedCategoriesToDatabase = function(db){
    seedCategories = new SeedCategories();
    db.categories.deleteMany({});
    db.categories.count()
    .then(count =>{
      if(count === 0)
        insertSeedDataIntoDb(seedCategories.initialCategories(), db.categories);      
      else
        console.log("Categories already seeded");      
    })
    .catch(errorHandler.logError);
};