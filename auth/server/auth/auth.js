const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/connection');
const users = db.get('users');
users.createIndex('username', {
    unique: true
});
const Joi = require('joi');
const schema = Joi.object({
    username: Joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9_.]{3,30}$')).required(),
    password: Joi.string().trim().min(6).required(),
});

function createTokenSendResponse(user, res, next) {
    const payload = {
        _id: user._id,
        username: user.username,
    };
    jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: '1d',
    }, (err, token) => {
        if (err) {
            respondError422(res, next);
        } else {
            res.json({
                token: token,
            })
        };
    });
}
router.get('/', (req, res) => {
    res.json({
        message: 'lock and loaded',
    });
});
router.post('/signup', (req, res, next) => {
    const {
        error,
        value
    } = schema.validate(req.body);
    if (error === undefined) {
        users.findOne({
            username: value.username,
        }).then((user) => {
            if (user) {
                const err = new Error("username already exist.");
                res.status(409);
                next(err);
            } else {
                bcrypt.hash(value.password.trim(), 12).then(hashedPassword => {
                    const newUser = {
                        username: value.username,
                        password: hashedPassword,
                    }
                    users.insert(newUser).then(insertedUser => {
                        // delete insertedUser.password;
                        // res.json(insertedUser);
                        createTokenSendResponse(insertedUser, res, next);
                    });
                });
            }
        });
    } else {
        res.status(422);
        next(error);
    }
});

function respondError422(res, next) {
    res.status(422);
    const err = new Error('Unable to login');
    next(err);
}
router.post('/login', (req, res, next) => {
    const {
        error,
        value
    } = schema.validate(req.body);
    if (error === undefined) {
        users.findOne({
            username: req.body.username,
        }).then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then(result => {
                        if (result) {
                            createTokenSendResponse(payload, res, next);
                        } else {
                            respondError422(res, next);
                        }
                    });
            } else {
                respondError422(res, next);

            }
        });
    } else {
        respondError422(res, next);
    }

});




module.exports = router;