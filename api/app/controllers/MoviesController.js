const Movie = require('../models/Movie');
const logger  = require('./../../config/winston');
const path = require('path');
const scriptName = path.basename(__filename);
class MoviesController {
    create(req, res) {
        // doubt creation will be needed
    }
    findAll(req, res) {
        Movie.find()
            .then(movie => {
                logger.info({ message: 'Movies were found', label: scriptName})
                res.json(movie);
            }).catch(err => {
                logger.warn({ message: 'Movies were not found', label: scriptName})
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving movies."
                });
            }); 
    }
    findOne(req, res) {
        Movie.findById(req.params.id)
            .then(movie => {  
                logger.info({ message: 'Movie was found', label: scriptName})
                if(!movie) {
                    return res.status(404).send({
                        message: "Movies not found with id " + req.params.id
                    })
                }
                res.send(movie)
            })
            .catch(err => { 
                if (err.kind === 'ObjectId') {
                    logger.warn({ message: `Movie not found with id : ${req.params.id}`, label: scriptName})
                    return res.status(404).send({
                        message: "Movies not found with id" + req.params.id
                    });
                }
                logger.warn({ message: `Error retrieving note with id : ${req.params.id}`, label: scriptName})  
                return res.status(500).send({
                    message: "Error retrieving note with id " + req.params.id
                })
            })
    }
    update(req, res) {
        Movie.findByIdAndUpdate(req.params.id, {
            Actors : req.body.actors,
            Country : req.body.country,
            Genre : req.body.genre,
            Plot : req.body.plot,
            Title: req.body.title,
            Year: req.body.year,
            })
            .then(movie => {
                logger.info({ message: 'Movie update was successful', label: scriptName})
                if(!movie) {
                    return res.status(404).send({
                        message: "Movie not found with id " + req.params.id
                    });
                }
                res.json(movie);
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    logger.warn({ message: `Movie not found with id : ${req.params.id}`, label: scriptName})  
                    return res.status(404).send({
                        message: "Movie not found with id " + req.params.id
                    });                
                }

                logger.warn({ message: `Error updating movie with id : ${req.params.id}`, label: scriptName})  
                return res.status(500).send({
                    message: "Error updating note with id " + req.params.id
                });
            });
    }
    delete(req, res) {
        Movie.findByIdAndRemove(req.params.id)
        .then(movie => {
            logger.info({ message: 'Movie deletion was successful', label: scriptName})
            if(!movie) {
                return res.status(404).send({
                    message: "Movie not found with id " + req.params.id
                });
            }
            res.send({message: "Movie deleted successfully!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                logger.warn({ message: `Movie not found with id : ${req.params.id}`, label: scriptName})  
                return res.status(404).send({
                    message: "Movie not found with id " + req.params.id
                });                
            }
            logger.warn({ message: `Error updating movie with id : ${req.params.id}`, label: scriptName})  
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.id
            });
        });
    }
}



module.exports = MoviesController;
