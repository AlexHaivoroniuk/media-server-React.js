const User = require('../models/User');
const logger  = require('../../config/winston');
const path = require('path');
const scriptName = path.basename(__filename);
class UserController {
    createLogins(req, res) {
        console.log('create logins');
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
                if (err) {
                    return res.status(500).send(logger.frontMessage(err.message || 'Creating user error.', 'error'));
                }
            });
        });
        return res.status(200);
    }
    login(req, res) {
        User.findOne({ username: req.body.username }, (err, user) => {
            if (err) {
                return res.status(500).send(logger.frontMessage(err.message || 'Logging error.', 'error'));
            }

            if (user) {
                // test a matching password
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (err) {
                        return res.status(500).send(logger.frontMessage(err.message || 'Logging error.', 'error'));
                    }

                    if (isMatch) {
                        res.json({
                            id: user._id,
                            username: user.username,
                            role: user.role
                        });
                    } else {
                        return res.status(401).send(logger.frontMessage(`Bad password for username '${req.body.username}'!`, 'error'));
                    }
                });
            } else {
                return res.status(404).send(logger.frontMessage(`User '${req.body.username}' not found!`, 'error'));
            }
        }).catch(err => {
            return res.status(500).send(logger.frontMessage(err.message || 'Logging error.', 'error'));
        });
    }
    get(req, res) {
        User.find()
        .then(user => {
            return res.json(user);
        }).catch(err => {
            return res.status(500).send(logger.frontMessage(err.message || 'Some error occurred while retrieving users.', 'error'));
        });
    }
    create(req, res) {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role
        });
        newUser.save(function(err) {
            if (err) {
                return res.status(500).send(logger.frontMessage(err.message || 'Creating user error.', 'error'));
            }
        });

        logger.front_info({ message: 'User created successfully', type: 'info' });

        return res.json({
            id: newUser._id,
            username: newUser.username,
            role: newUser.role
        });
    }
    update(req, res) {
        if(!req.body.username) {
            return res.status(400).send(logger.frontMessage('User name can not be empty', 'error'));
        }
        if(!req.body.role) {
            return res.status(400).send(logger.frontMessage('User role can not be empty', 'error'));
        }
        const data = {
            username: req.body.username,
            role: req.body.role
        };
        if(req.body.password) {
            data.password = req.body.password;
        }

        User.findByIdAndUpdate(req.params.id, data)
        .then(user => {
            if(!user) {
                return res.status(404).send(logger.frontMessage(`User not found with id ${req.params.id}`, 'error'));
            }

            logger.front_info({ message: 'User updated successfully', type: 'info' });
            res.send(user);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send(logger.frontMessage(`User not found with id ${req.params.id}`, 'error'));
            }

            return res.status(500).send(logger.frontMessage(`Error updating user with id ${req.params.id}`, 'error'));
        });
    }
    delete(req, res) {
        User.findByIdAndRemove(req.params.id)
        .then(user => {
            if(!user) {
                return res.status(404).send(logger.frontMessage(`User not found with id ${req.params.id}`, 'error'));
            }
            const message = 'User deleted successfully!';
            logger.front_info({ message, type: 'info' });

            res.send({ message });
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send(logger.frontMessage(`User not found with id ${req.params.id}`, 'error'));
            }

            return res.status(500).send(logger.frontMessage(`Could not delete user with id ${req.params.id}`, 'error'));
        });
    }
}

module.exports = UserController;
