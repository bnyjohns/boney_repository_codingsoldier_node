let technologies = ["Node", "MongoDb", "Express", "Vash View"];
let patternsAndPractices = ["Repository Pattern", "Promises Pattern"];

class HomeController{
    index(req, res){
        res.render('home/index', 
        { 
            title: "Coding Soldier - Boney Johns - Coding Soldier"    
        });
    }

    about(req, res){
        res.render('home/about',
        {
            title: "Boney Johns - Coding Soldier" 
        });
    }   
    
    technologies(req, res){
        res.render('home/technologies',
        {
            title: "Technologies Used - Coding Soldier - Coding Soldier",
            technologies: technologies,
            patternsAndPractices : patternsAndPractices
        });
    }
}
export default HomeController;