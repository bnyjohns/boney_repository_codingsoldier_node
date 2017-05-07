import PostsApiController from '../apicontrollers/postsApiController';
import HomeController from '../controllers/homeController';
import PostsController from '../controllers/postsController';
import StudiesController from '../controllers/studiesController';

let postsApiController, homeController, postsController, studiesController;
let initFn = function(req, res, next){
        if (req.query.page) {
            var page = parseInt(req.query.page);
            if(req.originalUrl.toLowerCase().includes('posts')){
                postsController.index(req, res);
            }                
        } 
        next();
};

class Routes{
    constructor(){
        postsApiController =  new PostsApiController();
        homeController = new HomeController();
        postsController = new PostsController();
        studiesController = new StudiesController();
    }
    init(app){
        app.use(initFn);        
        app.get('/api/posts/', postsApiController.getAllPosts);
        app.get('/api/posts/:postId', postsApiController.getPostById);

        app.get('/', homeController.index);
        app.get('/home/about/boney-johns/', homeController.about);
        app.get('/home/technologies/', homeController.technologies);

        app.get('/posts/', postsController.index);
        // app.get('/posts/create', postsController.create);
        // app.post('/posts/create', postsController.create);

        app.get('/studies/', studiesController.index);       
    }
}
export default Routes;