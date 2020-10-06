const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser
} = require("../controllers/User");
const { isSignedIn, isAuthenticated} = require("../controllers/Auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);


module.exports = router;
