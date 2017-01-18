(function(data){
  var seedPosts = require("./seedPosts");
  var seedStudies = require("./seedStudies");
  var seedCategories = require("./seedCategories");
  var database = require("./database");
  var postsDAL = require("./postsDAL");
  var categoriesDAL = require("./categoriesDAL");  
  var studiesDAL = require("./studiesDAL");

  data.getPostsCount = function(next){
    postsDAL.getPostsCount(next);
  };

  data.findPosts = function(pagingData, next){
      postsDAL.findPosts(pagingData, next);
  };  

  data.getPosts = function(id, next){
    postsDAL.getPosts(id, next);
  };

  data.getStudiesCount = function(next){
    studiesDAL.getStudiesCount(next);
  };

  data.findStudies = function(pagingData, next){
      studiesDAL.findStudies(pagingData, next);
  };

  data.getCategories = function(next){
    categoriesDAL.getCategories(next);
  };
  
  function seedDatabase(){
    database.getDb(function(error, db){
      if(error){
        console.log("Failed to connect to DB while attempting to seed");
      }
      else{
        seedPostsToDatabase(db);
        seedStudiesToDatabase(db);
        seedCategoriesToDatabase(db);
      }
     });    
  };

  function seedPostsToDatabase(db){
    db.posts.deleteMany({});
    db.posts.count(function(error, count){
      if(error){
        console.log("Error accessing posts");
      }
      else{
        if(count === 0){
          seedPosts.initialPosts.forEach(function(item) {
            db.posts.insert(item, function(err){
              if(err){
                console.log("Error inserting item into posts");
              }
            });
          });
        }
        else{
          console.log("Already seeded");
        }
      }
    });
  }

  function seedStudiesToDatabase(db){
    db.studies.deleteMany({});
    db.studies.count(function(error, count){
      if(error){
        console.log("Error accessing studies");
      }
      else{
        if(count === 0){
          seedStudies.initialStudies.forEach(function(item) {
            db.studies.insert(item, function(err){
              if(err){
                console.log("Error inserting item into studies");
              }
            });
          });
        }
        else{
          console.log("Already seeded");
        }
      }
    });
  }

  function seedCategoriesToDatabase(db){
    db.categories.deleteMany({});
    db.categories.count(function(error, count){
      if(error){
        console.log('Error accessing posts');
      }
      else{
        if(count === 0){
          seedCategories.initialCategories.forEach(function(item){
            db.categories.insert(item, function(err){
              if(err){
                console.log("Error inserting item into categories");
              }
            });
          });
        }
      }
    });
  }

  seedDatabase();
})(module.exports);