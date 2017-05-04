(function(homeController){
    var technologies = ["Node", "MongoDb", "Express", "Vash View"];
    var patternsAndPractices = ["Repository Pattern", "Promises Pattern"];

    homeController.index = function(req, res){
        res.render('home/index', 
        { 
            title: "Coding Soldier - Boney Johns - Coding Soldier"    
        });
    };

    homeController.about = function(req, res){
        res.render('home/about',
        {
            title: "Boney Johns - Coding Soldier" 
        });
    };    
    
    homeController.technologies = function(req, res){
        res.render('home/technologies',
        {
            title: "Technologies Used - Coding Soldier - Coding Soldier",
            technologies: technologies,
            patternsAndPractices : patternsAndPractices
        });
    };
})(module.exports);