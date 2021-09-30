const db = require('../models');
const jwt = require('jsonwebtoken');

// for development only
exports.getUsers = async (req, res, next) => {
  try {
    const users = await db.User.find();

    return res.status(200).json(users);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.register = async (req, res, next) => {
  try {
    const user = await db.User.create(req.body);
    const { id, username } = user;
    const token = jwt.sign({ id, username }, process.env.SECRET);

    return res.status(201).json({
      id,
      username,
      token,
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = 'Sorry, that username is already taken';
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      username: req.body.username,
    });
    const { id, username } = user;
    const valid = await user.comparePassword(req.body.password);

    if (valid) {
      const token = jwt.sign({ id, username }, process.env.SECRET);
      return res.status(200).json({
        id,
        username,
        token,
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    return next({ status: 400, message: 'Invalid Username/Password' });
  }
};
