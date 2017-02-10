(function(postsController){
    var data = require("../data");
    var pageSize = 2;

    postsController.create = function(req, res){
        if(typeof req.body.isAQuestion !== 'undefined'){
            var reqBody = req.body;
            var post = {
                id: 7,
                postTitle: reqBody.title,
                postContent: reqBody.content,
                isaQuestion: reqBody.isAQuestion === "on" ? true : false,
                tags: ["TagB", "TagC"],
                categoryName: "CategoryD"
            };
        }
        else{            
            data.getCategories(function(error, categories){
                res.render('posts/create',
                {                                    
                    title: "Create Post - Coding Soldier",
                    categories: categories                                  
                });
            }); 
        }               
    };

    postsController.index = function(req,res){
        var page = parseInt(req.query.page);       
        if(!page){
            page = 1;
        }
        
        var skip = page > 0 ? ((page - 1) * pageSize) : 0;
        var pagingData = {
            skip: skip,
            limit: pageSize
        };   

        data.getPostsCount()
        .then(function(totalPostsCount){
            findPosts(totalPostsCount, pagingData);            
        })  
        .catch(function(err){

        });

        function findPosts(totalPostsCount, pagingData){
            data.findPosts(pagingData)            
            .then(function(posts){
                renderPosts(totalPostsCount, posts);
            });
        }

        function renderPosts(totalPostsCount, posts){
            var totalPageCount = Math.ceil(totalPostsCount/pageSize);
            res.render('posts/index',
            {
                pageIndex: page,
                totalPageCount: totalPageCount,
                title: "Posts - Boney Johns - Coding Soldier",
                posts: posts
            });
        }
           
        // data.getPostsCount(function(err, totalPostsCount){
        //     if(!err){
        //         data.findPosts(pagingData, 
        //             function(error,posts){
        //                 var totalPageCount = Math.ceil(totalPostsCount/pageSize);
        //                 res.render('posts/index',
        //                 {
        //                     pageIndex: page,
        //                     totalPageCount: totalPageCount,
        //                     title: "Posts - Boney Johns - Coding Soldier",
        //                     posts: posts
        //                 });
        //             }
        //         ); 
        //     }
        //     else{

        //     }            
        // });
               
    };
})(module.exports);