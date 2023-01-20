const db = require('../../migration');
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {

    /**
     * store user details.
     */
    userStore: (req, res, next) => {
        const salt = bcrypt.genSaltSync(saltRounds);
        const password = bcrypt.hashSync(req.body.password, salt);
        const userData = {
            name: req.body.name,
            email: req.body.email,
            token: req.body.token,
            password: password
        }

        const user = new User(userData);
        db.query(User.getUserByEmail(userData.email), (err, data) => {
            if (err) {
                res.status(401).json({
                    'error': err.message,
                });
            }

            if (data.length >= 1) {
                if (data[0].email === userData.email) {
                    res.status(401).json({
                        'message': 'User already exists',
                    });
                }
            } else {
                db.query(user.addUser(), (err, result) => {
                    if (err) {
                        res.status(400).json({
                            'error': err.message,
                        })
                    }
                    ;

                    db.query(User.getUserById(result.insertId), (err, data) => {
                        if (err) {
                            res.status(401).json({
                                'errors': err.message,
                            })
                        }

                        res.status(200).json({
                            'data': {
                                id: data[0].id,
                                name: data[0].name,
                                email: data[0].email,
                                token: data[0].token
                            },
                        });
                    })
                });
            }
        });
    },

    /**
     * Get the lists of all users.
     */
    usersLists: (req, res, next) => {
        db.query(User.getAllUsers(), (err, result) => {
            if (err) {
                res.status(400).json({
                    'error': err.message,
                })
            }

            res.status(200).json({
                'data': result,
            });
        })
    },

    /**
     * Update user details.
     */
    updateUser: (req, res, next) => {
        const userData = {
            name: req.body.name,
            email: req.body.email,
            token: req.body.token,
            password: req.body.password
        }

        const user = new User(userData);
        const id = req.params.id;
        db.query(user.updateUser(id), (err, result) => {
            if (err) {
                res.status(400).json({
                    'error': err.message,
                });
            }

            db.query(User.getUserById(id), (err, userData) => {

                if (err) {
                    res.status(400).json({
                        'error': err.message,
                    });
                }

                res.status(200).json({
                    'message': 'User updated successfully.',
                    'data': userData[0],
                });
            });
        });
    },
    /**
     * get user details by user id.
     */
    getUserById: (req, res, next) => {
        const id = req.params.id;
        db.query(User.getUserById(id), (err, result) => {
            if (err) {
                res.status(404).json({
                    'error': err.message,
                });
            }

            res.status(200).json({
                'data': result[0],
            });
        })
    },

    deleteUser: (req, res, next) => {
        const id = req.params.id;
        db.query(User.deleteUserById(id), (err, result) => {
            if (err) {
                res.status(404).json({
                    'error': err.message,
                });
            }

            res.status(200).json({
                'message': 'User deleted successfully.',
            });
        })
    }
}
