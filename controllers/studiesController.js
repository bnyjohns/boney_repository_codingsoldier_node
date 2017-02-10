(function(studiesController){
    var data = require("../data");
    var pageSize = 2;

    studiesController.index = function(req, res){
        var page = parseInt(req.query.page);       
        if(!page){
            page = 1;
        }

        var skip = page > 0 ? ((page - 1) * pageSize) : 0;
        var pagingData = {
            skip: skip,
            limit: pageSize
        };

        data.getStudiesCount()
        .then(function(totalStudiesCount){
            findAndRenderStudies(totalStudiesCount, pagingData);            
        })
        .catch(function(err){

        });

    function findAndRenderStudies(totalStudiesCount, pagingData){
        data.findStudies(pagingData)
        .then(function(studies){
            renderStudies(totalStudiesCount, studies);
        });
    }

    function renderStudies(totalStudiesCount, studies){
        var totalPageCount = Math.ceil(totalStudiesCount/pageSize);
        res.render('studies/index',
        {
            pageIndex: page,
            totalPageCount: totalPageCount,
            title: "Studies - Boney Johns - Coding Soldier",
            studies: studies
        });
    }
        

    // data.getStudiesCount(function(err, totalStudiesCount){
    //     if(!err){
    //         data.findStudies(pagingData, 
    //             function(error,studies){
    //                 var totalPageCount = Math.ceil(totalStudiesCount/pageSize);
    //                 res.render('studies/index',
    //                 {
    //                     pageIndex: page,
    //                     totalPageCount: totalPageCount,
    //                     title: "Studies - Boney Johns - Coding Soldier",
    //                     studies: studies
    //                 });
    //             }
    //         ); 
    //     }
    //     else{

    //     }            
    // });
    };   

})(module.exports);