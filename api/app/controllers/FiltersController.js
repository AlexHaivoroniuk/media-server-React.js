const Movie = require('../models/Movie');
const logger  = require('../../config/winston');
const path = require('path');
const scriptName = path.basename(__filename);
const uniq = require('lodash/uniq');
class FiltersController {
    create(req, res) {
        // doubt creation will be needed
    }
    findAll(req, res) {
        const getColumn = function (name) {
            return Movie.find().distinct(name)
                .then(recs => {
                    let arr = [];
                    recs.forEach((el) => {
                        arr = [...arr, ...el.split(',').map(el => el.trim())];
                    });
                    logger.info({ message: `${name} were found`, label: scriptName})
                    return uniq(arr).sort();
                }).catch(err => {
                    logger.warn({ message: `${name} were not found`, label: scriptName})
                    return Promise.reject({
                        message: err.message || `Some error occurred while retrieving ${name}.`
                    });
                });
        }

        return Promise.all([getColumn('Genre'), getColumn('Country')])
            .then(values => {
                logger.info({ message: 'Data for the filter was successfully received', label: scriptName})
                res.json({
                    genres: values[0],
                    countries: values[1]
                });
            }).catch(err => {
                res.status(500).send(err);
            });
    }
}

module.exports = FiltersController;
