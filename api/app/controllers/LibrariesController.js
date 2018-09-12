const Libraries = require('../models/Libraries');
const logger  = require('../../config/winston');
const path = require('path');
const scriptName = path.basename(__filename);
class LibrariesController {
    create(req, res) {
        if(!req.body.name) {
            return res.status(400).send({
                message: "library name can not be empty"
            });
        }
        if(!req.body.path) {
            return res.status(400).send({
                message: "library path can not be empty"
            });
        }
        if(!req.body.uId) {
            return res.status(400).send({
                message: "library uId can not be empty"
            });
        }
    
        const library = new Libraries({
            name: req.body.name,
            path: req.body.path,
            userId: req.body.uId
        });

        library.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Library."
            });
        });
    }
    findAll(req, res) {
        Libraries.find()
            .then(lib => {
                logger.info({ message: 'INFO Libraries received ', label: scriptName,  line: __line})
                res.json(lib);
            }).catch(err => {
                logger.warn({ message: 'WARN Libraries failed to receive', label: scriptName,  line: __line})
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving libs."
                });
            }); 
    }
    findOne(req, res) {
        Libraries.findById(req.params.id)
            .then(lib => {  
                logger.front_info({ message: 'FRONT Got One Library', type: 'info', label: scriptName,  line: __line})
                logger.info({ message: ' INFO Library was found', label: scriptName,  line: __line})
                if(!lib) {
                    return res.status(404).send({
                        message: "Librarys not found with id " + req.params.id
                    })
                }
                res.send(lib)
            })
            .catch(err => {
                logger.front_info({ message: 'FRONT Not found', type: 'error', label: scriptName, line: __line})
                if (err.kind === 'ObjectId') {
                    logger.warn({ message: `Library not found with id : ${req.params.id}`, label: scriptName, line: __line})
                    return res.status(404).send({
                        message: "WARN Libraries not found with id" + req.params.id
                    });
                }
                logger.warn({ message: `WARN Error retrieving note with id : ${req.params.id}`, label: scriptName, line: __line})  
                return res.status(500).send({
                    message: "Error retrieving note with id " + req.params.id
                })
            })
    }
    update(req, res) {
        if(!req.body.name) {
            return res.status(400).send({
                message: "library name can not be empty"
            });
        }
        if(!req.body.path) {
            return res.status(400).send({
                message: "library path can not be empty"
            });
        }
        if(!req.body.uId) {
            return res.status(400).send({
                message: "library uId can not be empty"
            });
        }

        Libraries.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            path: req.body.path,
            userId: req.body.uId
            })
            .then(lib => {
                logger.info({ message: ' INFO Library update was successful', label: scriptName, line: __line})
                if(!lib) {
                    return res.status(404).send({
                        message: "Library not found with id " + req.params.id
                    });
                }
                res.json(lib);
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    logger.warn({ message: `WARN Library not found with id : ${req.params.id}`, label: scriptName,  line: __line})  
                    return res.status(404).send({
                        message: "Library not found with id " + req.params.id
                    });                
                }

                logger.warn({ message: `WARN Error updating Library with id : ${req.params.id}`, label: scriptName, line: __line})  
                return res.status(500).send({
                    message: "Error updating note with id " + req.params.id
                });
            });
    }
    delete(req, res) {
        Libraries.findByIdAndRemove(req.params.id)
        .then(lib => {
            logger.info({ message: 'INFO Library deletion was successful', label: scriptName})
            if(!lib) {
                return res.status(404).send({
                    message: "Library not found with id " + req.params.id
                });
            }
            res.send({message: "Library deleted successfully!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                logger.warn({ message: `WARN Library not found with id : ${req.params.id}`, label: scriptName, line: __line})  
                return res.status(404).send({
                    message: "Library not found with id " + req.params.id
                });                
            }
            logger.warn({ message: `WARN Error updating Library with id : ${req.params.id}`, label: scriptName, line: __line})  
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.id
            });
        });
    }
}



module.exports = LibrariesController;
