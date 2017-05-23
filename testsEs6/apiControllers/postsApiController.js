import PostsApiController from '../../srcEs6/apicontrollers/postsApiController';
import Data from '../../srcEs6/data';

let dataFunc;
describe('PostApiController Tests', () =>{    
    before(() => {
        
    });      

    after(() => {
        
    });

    it('getAllPosts should call getPosts In Data', function(done){ 
        let data = new Data();  
        let mockData = sinon.mock(data);

        let mockPosts = [{'a': 1},{'a': 2}]; 
        let promisePosts = new Promise((resolve, reject) => resolve(promisePosts));

        //let response = new Response();
        //let mockResponse = sinon.mock(response);        

        mockData.expects('getPosts').returns(promisePosts);
        //mockResponse.expects('send').calledWith(promisePosts);

        var postsApiController = new PostsApiController(data);
        postsApiController.getAllPosts()
        .then(function(value){
            expect(value).equals(undefined);
            done();
        }); 

        mockData.verify();
        //mockResponse.verify();

        mockData.restore();
        //mockResponse.restore();
    });
});

