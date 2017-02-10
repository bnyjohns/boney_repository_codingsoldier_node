(function(errorHandler){
    errorHandler.logError = function(error){
        console.log(error);
        return error;
    };
})(module.exports);