import PostsApiController from '../apicontrollers/postsApiController';
import HomeController from '../controllers/homeController';
import PostsController from '../controllers/postsController';
import StudiesController from '../controllers/studiesController';
import Data from '../data';
import Routes from './routes';
import Database from '../data/database';
import PostsDAL from '../data/postsDAL';
import StudiesDAL from '../data/studiesDAL';
import CategoriesDAL from '../data/categoriesDAL';
import ErrorHandler from './errorHandler';

class DiContainer{ 

    static resolveData(){
        return DiContainer.getInstance('Data');
    }

    static resolveRoutes(){
        return DiContainer.getInstance('Routes');
    }

    static resolveHomeController(){
        return DiContainer.getInstance('HomeController');
    }

    static resolvePostsApiController(){
        return DiContainer.getInstance('PostsApiController');
    }

    static resolvePostsController(){
        return DiContainer.getInstance('PostsController');
    }

    static resolveStudiesController(){
        return DiContainer.getInstance('StudiesController');
    }

    static resolveDatabase(){
        return DiContainer.getInstance('Database');
    }

    static resolvePostsDAL(){
        return DiContainer.getInstance('PostsDAL');
    }

    static resolveCategoriesDAL(){
        return DiContainer.getInstance('CategoriesDAL');
    }

    static resolveStudiesDAL(){
        return DiContainer.getInstance('StudiesDAL');
    }

    static resolveErrorHandler(){
        return DiContainer.getInstance('ErrorHandler');
    }
    
    static getInstance(typeName){
        switch(typeName){
            case "Data":
            return new Data(this.resolveDatabase(), this.resolvePostsDAL(), this.resolveCategoriesDAL(), 
                this.resolveStudiesDAL(), this.resolveErrorHandler());
            break;

            case "PostsApiController":            
            return new PostsApiController(this.resolveData());
            break;

            case "PostsController":
            return new PostsController(this.resolveData());
            break;

            case "StudiesController":
            return new StudiesController(this.resolveData());
            break;

            case "HomeController":
            return new HomeController();
            break;

            case "Routes":
            return new Routes(this.resolvePostsApiController(), this.resolveHomeController(), this.resolvePostsController(),
                this.resolveStudiesController());
            break;

            case "Database":
            return new Database();
            break;

            case "PostsDAL":
            return new PostsDAL(this.resolveDatabase());
            break;

            case "CategoriesDAL":
            return new CategoriesDAL(this.resolveDatabase());
            break;

            case "StudiesDAL":
            return new StudiesDAL(this.resolveDatabase());
            break;

            case "ErrorHandler":
            return new ErrorHandler();
            break;

            default:
            return null;
            break;
        }
    }
}

export default DiContainer;