const TV = require('../models/TV');
const logger  = require('../../config/winston');
const path = require('path');
const scriptName = path.basename(__filename);
class TVsController {
    create(req, res) {
        // doubt creation will be needed
    }
    findOne(req, res) {
        TV.findById(req.params.id)
            .then(tv => {  
                logger.front_info({ message: 'FRONT Got One TV', type: 'info', label: scriptName,  line: __line})
                logger.info({ message: ' INFO TV was found', label: scriptName,  line: __line})
                if(!tv) {
                    return res.status(404).send({
                        message: "TV not found with id " + req.params.id
                    })
                }
                res.send(tv)
            })
            .catch(err => {
                logger.front_info({ message: 'FRONT Not found', type: 'error', label: scriptName, line: __line})
                if (err.kind === 'ObjectId') {
                    logger.warn({ message: `TV not found with id : ${req.params.id}`, label: scriptName, line: __line})
                    return res.status(404).send({
                        message: "WARN TV not found with id" + req.params.id
                    });
                }
                logger.warn({ message: `WARN Error retrieving note with id : ${req.params.id}`, label: scriptName, line: __line})  
                return res.status(500).send({
                    message: "Error retrieving note with id " + req.params.id
                })
            })
    }
}

module.exports = TVsController;
