(function(routes){
    var postsApiController = require('./apicontrollers/postsApiController');
    var homeController = require('./controllers/homeController');
    var postsController = require('./controllers/postsController');  
    var studiesController = require('./controllers/studiesController');  

    routes.init = function(app){
        app.use(function(req, res, next){
            if (req.query.page) {
                var page = parseInt(req.query.page);
                if(req.originalUrl.toLowerCase().includes('posts')){
                    postsController.index(req, res);
                }                
            } 
            next();
        });        
        app.get('/api/posts/', postsApiController.getAllPosts);
        app.get('/api/posts/:postId', postsApiController.getPostById);

        app.get('/', homeController.index);
        app.get('/home/about/boney-johns/', homeController.about);
        app.get('/home/technologies/', homeController.technologies);

        app.get('/posts/', postsController.index);
        // app.get('/posts/create', postsController.create);
        // app.post('/posts/create', postsController.create);

        app.get('/studies/', studiesController.index);        
        
    };    
})(module.exports);