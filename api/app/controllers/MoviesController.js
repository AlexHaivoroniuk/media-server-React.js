const Movie = require('../models/Movie');

class MoviesController {

    create(req, res) {
        // doubt creation will be needed
    }
    findAll(req, res) {
        Movie.find()
            .then(movie => {
                res.json(movie);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving movies."
                });
            }); 
    }
    findOne(req, res) {
        Movie.findById(req.params.id)
            .then(movie => {
                if(!movie) {
                    return res.status(404).send({
                        message: "Movies not found with id " + req.params.id
                    })
                }
                res.send(movie)
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Movies not found with id" + req.params.id
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving note with id " + req.params.id
                })
            })
    }
    update(req, res) {
        // console.log(req.params)
        // console.log(req)
        Movie.findByIdAndUpdate(req.params.id, {
            Actors : req.body.actors,
            Country : req.body.country,
            Genre : req.body.genre,
            Plot : req.body.plot,
            Title: req.body.title,
            Year: req.body.year,
            })
            .then(movie => {
                if(!movie) {
                    return res.status(404).send({
                        message: "Movie not found with id " + req.params.id
                    });
                }
                res.json(movie);
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Movie not found with id " + req.params.id
                    });                
                }
                return res.status(500).send({
                    message: "Error updating note with id " + req.params.id
                });
            });
    }
    delete(req, res) {
        Movie.findByIdAndRemove(req.params.id)
        .then(movie => {
            if(!movie) {
                return res.status(404).send({
                    message: "Movie not found with id " + req.params.id
                });
            }
            res.send({message: "Movie deleted successfully!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Movie not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.id
            });
        });
    }
}



module.exports = MoviesController;
