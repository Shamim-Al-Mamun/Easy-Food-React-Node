const { body } = require("express-validator");
const productValidation = [
  body("title")
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ max: 150 })
    .withMessage("Product title must finish 150 characters")
    .trim(),
  body("description")
    .notEmpty()
    .withMessage("Product description is required")
    .trim(),
  body("price").notEmpty().withMessage("Product Price is required").trim(),
  body("category")
    .notEmpty()
    .trim()
    .withMessage("Product category is required"),
  body("shortDescription")
    .notEmpty()
    .trim()
    .withMessage("Short Description is required")
    .isLength({ max: 250 })
    .withMessage("Short Description must finish 250 characters"),
  body("description")
    .notEmpty()
    .trim()
    .withMessage("Description is required"),
];

module.exports = productValidation;
