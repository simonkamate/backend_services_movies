module.exports = app => {
    const movies = require("../controllers/movie.controller.js");
    let router = require("express").Router();

    // Create a new movie
    router.post("/",movies.create);

    // retrieve all movies
    router.get("/",movies.findAll);

   
    // Retrieve a single movie with id
    router.get("/:id",movies.findOne);

    // Update a movie with id
    router.put("/:id",movies.update);

    // Delete a movie with id 
    router.delete("/:id",movies.delete);

    // Delete all movies
    router.delete("/",movies.deleteAll);

    app.use("/api/movies",router);


};


/* 


*/