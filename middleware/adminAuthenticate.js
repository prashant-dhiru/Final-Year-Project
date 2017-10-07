//creating a authenticate function to be used as a reference, for private route
//will check if the admin is authenticated, will be executed before the actual route
var adminAuthenticate = (request, response, next) => {

    // if the admin is not authenticated, send empty response with Unauthorised status code
    if (!request.session.isAuthenticated) return response.status(401).send();

    //if the authenticated user is student, finish route with return keyword, and send empty response with Unauthorised status code
    if (request.session.userLevel == 1) return response.status(401).send();

    // if here, authenticated user is student, 
    //calling next to finish execution of route
    next();
    
    //function ends here
};

//exporting the function to be used in routes
module.exports = {adminAuthenticate};