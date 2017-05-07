import Data from '../data';

let pageSize = 2;
let data;
let render = function(page, totalStudiesCount, studies, response){
    response.render('studies/index',
    {
        pageIndex: page,
        totalPageCount: totalStudiesCount,
        title: "Studies - Boney Johns - Coding Soldier",
        studies: studies
    });
};

class StudiesController{  
    constructor(){
        data = new Data();
    }    
    index(req, res){
        let page = parseInt(req.query.page);
        let totalPageCount = 0;

        if(!page){
            page = 1;
        }

        let skip = page > 0 ? ((page - 1) * pageSize) : 0;
        let pagingData = {
            skip: skip,
            limit: pageSize
        };
        
        let studiesCountPromise = data.getStudiesCount();
        let studiesPromise = data.findStudies(pagingData);

        Promise.all([studiesCountPromise,studiesPromise])
        .then(values => {
            let totalCount = Math.ceil(values[0]/pageSize);  
            render(page, totalCount, values[1], res);
        })
        .catch(function(err){
            console.log(err);
        });   
    }
}
export default StudiesController;