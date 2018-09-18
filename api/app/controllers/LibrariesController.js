const Libraries = require('../models/Libraries');
const Movie = require('./../models/Movie')
const logger  = require('../../config/winston');
const path = require('path');
const fs   = require('fs');
const scriptName = path.basename(__filename);
const PopulateDB = require('./../middleware/PopulateDbWithMovie');
const watcherSync = require('./../utils/WatchAndSyncFolder');
class LibrariesController {
    constructor() {
        this.watcherInstance = {}; 
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
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

        if(!fs.existsSync(req.body.path)) {
            return res.status(400).send({
                msg: "Invalid path to folder. Type correct path due to your OS(Windows, MacOS, Linux)"
            });
        }
        
        const library = new Libraries({
            name: req.body.name,
            path: req.body.path,
            userId: req.body.uId
        });


        library.save()
            .then(data => {
                logger.front_info({ message: 'Library has been added successfully', type: 'success', label: scriptName,  line: __line})
                PopulateDB(req, res);
                let watcher = watcherSync(data.path, data._id)
               
                this.watcherInstance[data._id] = watcher;
                
                res.send(data);
               
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Library."
                });
            });

        /*TODO add check to  prevent duplicate lib paths being added */
    }
    setWatchersForAll() {
      
        Libraries.find()
            .then(libs => {
                if (libs.length > 0) {
                    libs.forEach((lib) => {
                        let watcher = watcherSync(lib.path, lib._id);
                        this.watcherInstance[lib._id] = watcher;
                      
                    })
                }
                logger.info({ message: 'Watchers for libraries have been set', label: scriptName,  line: __line})
            }).catch(err => {
              
                logger.warn({ message: 'Failed to receive libraries when seWatchersForAll', label: scriptName,  line: __line})
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
                    logger.warn({ message: `WARN Libraries not found with id : ${req.params.id}`, label: scriptName,  line: __line})  
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
            if(!lib) {
                return res.status(404).send({
                    message: "Library not found with id " + req.params.id
                });
            }
            else {
                
                this.watcherInstance[req.params.id].close();
                delete this.watcherInstance[req.params.id];
               
                Movie
                    .deleteMany({ libraryId: req.params.id })
                    .then(data => { 
                        logger.front_info({ message: 'Library and it\'s movies were deleted successfuly', type:'warn', label: scriptName, line: __line})
                        logger.info({ message: 'INFO Library deletion was successful', label: scriptName})
                    })
                    .catch(err => new Error());
               
                res.send({message: "Library deleted successfully!"});
            }
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
