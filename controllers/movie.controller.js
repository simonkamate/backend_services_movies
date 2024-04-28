const e = require("express");
const db = require("../models");
const Movie = db.movies;

exports.create = function (req, res) {
    // Validate request
    if (!req.body.titre) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a Movie
    const movie = new Movie({
        id: req.body.id,
        titre: req.body.titre,
        annee: req.body.annee,
    });
    // Save Movie in the database
    movie
        .save(movie)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the movie.",
            });
        });
};


// Retrieve all movie from the database.
exports.findAll = (req, res) => {
    const titre = req.query.titre;
    let condition = titre
        ? { titre: { $regex: new RegExp(titre), $options: "i" } }
        : {};
    Movie.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving movies.",
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;
    Movie.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message:
                        "Not found Movie with id " + id
                });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving movie with id=" + id });
        });
};

// Update a movie by the id in the request

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty !",
        });
    }

    const id = req.params.id;
    Movie.findByIdAndUpdate(id, req.body,
        { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(400).send({
                    message: `Cannot update movie with id = ${id}. Maybe movie was not found`,
                });
            } else res.send({ message: "Movie was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating movie with id=" + id,
            });
        });
};

// Supprimer un film avec l'ID spécifié dans la requête
exports.delete = (req, res) => {
    const id = req.params.id;
    Movie.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Impossible de supprimer le film avec l'ID=${id}. Peut-être que le film n'a pas été trouvé !`,
                });
            } else {
                res.send({
                    message: "Le film a été supprimé avec succès",
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de supprimer le film avec l'ID=" + id,
            });
        });
};

// Delete all Movies from the database
exports.deleteAll = (req,res) => {
    Movie.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount}
                Movies were deleted successfully`,
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all movies.",
            });
        });
};



