const User = require('../models/User');
const logger  = require('../../config/winston');
const path = require('path');
const scriptName = path.basename(__filename);
class UserController {
    create(req, res) {
        [
            {
                username: 'admin',
                password: 'admin',
                role: 'Admin'
            },
            {
                username: 'm1',
                password: 'm1',
                role: 'Admin'
            },
            {
                username: 'user',
                password: 'user',
                role: 'User'
            }
        ].forEach(user => {
            const newUser = new User(user);
            newUser.save(function(err) {
                if (err) return res.status(500).send({
                    message: err.message || "Creating user error."
                });
            });
        });
        return res.status(200);
    }
    login(req, res) {
        User.findOne({ username: req.body.username }, (err, user) => {
            if (err) throw err;

            if (user) {
                // test a matching password
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch) {
                        res.json({
                            id: user._id,
                            username: user.username,
                            role: user.role
                        });
                    } else {
                        const message = `Bad password for username '${req.body.username}'!`;
                        logger.error({ message: message, label: scriptName,  line: __line})
                        res.status(401).send({
                            message: message
                        });
                    }
                });
            } else {
                const message = `User '${req.body.username}' not found!`;
                logger.error({ message: message, label: scriptName,  line: __line})
                res.status(404).send({
                    message: message
                });
            }
        }).catch(err => {
            logger.error({ message: 'Logging error', label: scriptName,  line: __line})
            res.status(500).send({
                message: err.message || "Logging error."
            });
        });
    }
}

module.exports = UserController;
