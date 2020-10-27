const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {createCategory,getCategories}=require('../controllers/Category');

router.post(
    "/createCategory",
    [
      check("name", "name should be at least 3 char").isLength({ min: 3 }),
    ],
    createCategory
  );
  
router.get(
  "/getAllCategories",
  getCategories
)
module.exports = router;
