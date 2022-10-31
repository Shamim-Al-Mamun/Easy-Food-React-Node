const { body } = require("express-validator");
const Category = require("../models/Category");
const categoryValidation = [
  body("categoryName")
    .notEmpty()
    .withMessage("category Name is required")
    .custom(async (categoryName) => {
      const category = await Category.findOne({ categoryName });
      if (category) {
        return Promise.reject("Category already exists");
      }  
    }), 
];

module.exports = categoryValidation;
