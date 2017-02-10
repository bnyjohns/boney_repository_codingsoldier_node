(function(data){
  var seedPosts = require("./seedPosts");
  var seedStudies = require("./seedStudies");
  var seedCategories = require("./seedCategories");
  var database = require("./database");
  var postsDAL = require("./postsDAL");
  var categoriesDAL = require("./categoriesDAL");  
  var studiesDAL = require("./studiesDAL");
  var errorHandler = require('../core/errorHandler');

  data.getPostsCount = function(){
    return postsDAL.getPostsCount();
  };

  data.findPosts = function(pagingData){
    return postsDAL.findPosts(pagingData);
  };  

  data.getPosts = function(id){
    return postsDAL.getPosts(id);
  };

  data.getStudiesCount = function(){
    return studiesDAL.getStudiesCount();
  };

  data.findStudies = function(pagingData){
    return studiesDAL.findStudies(pagingData);
  };

  data.getCategories = function(){
    return categoriesDAL.getCategories();
  };
  
  function seedDatabase(){
      database.getDb()
      .then(function(db){      
          seedPostsToDatabase(db);
          seedStudiesToDatabase(db);
          seedCategoriesToDatabase(db);
      })
      .catch(function(error){
          console.log("Failed to connect to DB while attempting to seed");
      });    
  }

  function insertSeedDataIntoDb(seedData,dbData){
    seedData.forEach(function(item) {
        dbData.insert(item, function(err){
          if(err){
            console.log("Error inserting item into Db");
          }
        });
    });
  }

  function seedPostsToDatabase(db){
    db.posts.deleteMany({});
    db.posts.count()
    .then(function(count){
      if(count === 0)
        insertSeedDataIntoDb(seedPosts.initialPosts, db.posts);      
      else
        console.log("Posts already seeded");      
    })
    .catch(errorHandler.logError);    
  }

  function seedStudiesToDatabase(db){
    db.studies.deleteMany({});
    db.studies.count()
    .then(function(count){
      if(count === 0)
        insertSeedDataIntoDb(seedStudies.initialStudies, db.studies);      
      else
        console.log("Studies already seeded");      
    })
    .catch(errorHandler.logError);    
  }

  function seedCategoriesToDatabase(db){
    db.categories.deleteMany({});
    db.categories.count()
    .then(function(count){
      if(count === 0)
        insertSeedDataIntoDb(seedCategories.initialCategories, db.categories);      
      else
        console.log("Categories already seeded");      
    })
    .catch(errorHandler.logError);
  }

  seedDatabase();
})(module.exports);