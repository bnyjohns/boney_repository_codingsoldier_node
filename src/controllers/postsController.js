(function(postsController){
    let data = require("../data");
    let pageSize = 2;

    postsController.create = function(req, res){
        if(typeof req.body.isAQuestion !== 'undefined'){
            let reqBody = req.body;
            let post = {
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
        let page = parseInt(req.query.page);       
        if(!page){
            page = 1;
        }
        
        let skip = page > 0 ? ((page - 1) * pageSize) : 0;
        let pagingData = {
            skip: skip,
            limit: pageSize
        };   

        let getPostsCountPromise = data.getPostsCount();
        let findPostsPromise = data.findPosts(pagingData);

        Promise.all([getPostsCountPromise, findPostsPromise])
        .then(values => {
            renderPosts(page, values[0], values[1], res);
        })
        .catch(err => {
            console.log(err);
        });            
    };

    let renderPosts = function(page, totalPostsCount, posts, res){
            var totalPageCount = Math.ceil(totalPostsCount/pageSize);
            res.render('posts/index',
            {
                pageIndex: page,
                totalPageCount: totalPageCount,
                title: "Posts - Boney Johns - Coding Soldier",
                posts: posts
            });
    };
})(module.exports);