require("dotenv").config();
module.exports = {
  PORT: process.env.PORT,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  JWT_SECRET: process.env.JWT_SECRET,
  STRIPE_SECRET:process.env.STRIPE_SECRET,
};
