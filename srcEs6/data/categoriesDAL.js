class CategoriesDAL{
    getCategories(){
        return database.getDb()
            .then(function(db){
                return db.categories.find().toArray();                
            })
            .catch(function(err){
                console.log(err);
            });        
    };
}
export default CategoriesDAL;